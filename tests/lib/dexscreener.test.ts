import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DexScreenerClient, DexScreenerError } from '@/lib/dexscreener'

// Mock fetch globally
global.fetch = vi.fn()

describe('DexScreenerClient', () => {
  let client: DexScreenerClient

  beforeEach(() => {
    client = new DexScreenerClient()
    vi.clearAllMocks()
  })

  describe('formatNumber', () => {
    it('should format billions correctly', () => {
      expect(DexScreenerClient.formatNumber(1500000000)).toBe('$1.50B')
      expect(DexScreenerClient.formatNumber(2500000000)).toBe('$2.50B')
    })

    it('should format millions correctly', () => {
      expect(DexScreenerClient.formatNumber(1500000)).toBe('$1.50M')
      expect(DexScreenerClient.formatNumber(2500000)).toBe('$2.50M')
    })

    it('should format thousands correctly', () => {
      expect(DexScreenerClient.formatNumber(1500)).toBe('$1.50K')
      expect(DexScreenerClient.formatNumber(2500)).toBe('$2.50K')
    })

    it('should format small numbers correctly', () => {
      expect(DexScreenerClient.formatNumber(150.50)).toBe('$150.50')
      expect(DexScreenerClient.formatNumber(0)).toBe('$0.00')
    })
  })

  describe('formatPercentage', () => {
    it('should format positive percentages correctly', () => {
      expect(DexScreenerClient.formatPercentage(15.5)).toBe('+15.50%')
      expect(DexScreenerClient.formatPercentage(0)).toBe('+0.00%')
    })

    it('should format negative percentages correctly', () => {
      expect(DexScreenerClient.formatPercentage(-15.5)).toBe('-15.50%')
      expect(DexScreenerClient.formatPercentage(-0.5)).toBe('-0.50%')
    })
  })

  describe('formatPrice', () => {
    it('should format very small prices with exponential notation', () => {
      expect(DexScreenerClient.formatPrice('0.00001234')).toBe('$1.234e-5')
      expect(DexScreenerClient.formatPrice('0.000001')).toBe('$1.000e-6')
    })

    it('should format small prices with 6 decimal places', () => {
      expect(DexScreenerClient.formatPrice('0.001234')).toBe('$0.001234')
      expect(DexScreenerClient.formatPrice('0.012345')).toBe('$0.012345')
    })

    it('should format regular prices with 4 decimal places', () => {
      expect(DexScreenerClient.formatPrice('1.2345')).toBe('$1.2345')
      expect(DexScreenerClient.formatPrice('123.4567')).toBe('$123.4567')
    })
  })

  describe('getPairData', () => {
    it('should fetch and parse pair data successfully', async () => {
      const mockResponse = {
        pairs: [{
          chainId: 'solana',
          dexId: 'raydium',
          url: 'https://dexscreener.com/solana/0x123',
          pairAddress: '0x123',
          baseToken: {
            address: '0xbase',
            name: 'Yellow Pup',
            symbol: 'YPUP'
          },
          quoteToken: {
            address: '0xquote',
            name: 'USDC',
            symbol: 'USDC'
          },
          priceUsd: '0.001234',
          volume: { h24: 50000 },
          priceChange: { h24: 15.5 },
          liquidity: { usd: 100000 },
          fdv: 500000
        }]
      }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      const result = await client.getPairData('solana', 'test-pair')

      expect(result).toEqual({
        priceUsd: '0.001234',
        marketCap: 1000000, // liquidity * 10
        fdv: 500000,
        liquidityUsd: 100000,
        volume24h: 50000,
        priceChange24h: 15.5,
        dexUrl: 'https://dexscreener.com/solana/0x123',
        lastUpdated: expect.any(Date)
      })
    })

    it('should handle API errors gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })

      await expect(client.getPairData('solana', 'invalid-pair'))
        .rejects
        .toThrow(DexScreenerError)
    })

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(client.getPairData('solana', 'test-pair'))
        .rejects
        .toThrow(DexScreenerError)
    })

    it('should handle empty pairs response', async () => {
      const mockResponse = { pairs: [] }

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })

      await expect(client.getPairData('solana', 'test-pair'))
        .rejects
        .toThrow('No pair data found')
    })

    it('should retry on failure with exponential backoff', async () => {
      const mockResponse = {
        pairs: [{
          chainId: 'solana',
          dexId: 'raydium',
          url: 'https://dexscreener.com/solana/0x123',
          pairAddress: '0x123',
          baseToken: { address: '0xbase', name: 'Test', symbol: 'TEST' },
          quoteToken: { address: '0xquote', name: 'USDC', symbol: 'USDC' },
          priceUsd: '1.00',
          volume: { h24: 1000 },
          priceChange: { h24: 0 },
          liquidity: { usd: 10000 },
          fdv: 50000
        }]
      }

      // First call fails, second succeeds
      global.fetch = vi.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        })

      const result = await client.getPairData('solana', 'test-pair')

      expect(global.fetch).toHaveBeenCalledTimes(2)
      expect(result).toBeDefined()
    })
  })
})

describe('DexScreenerError', () => {
  it('should create error with message and optional status/code', () => {
    const error = new DexScreenerError('Test error', 404, 'NOT_FOUND')
    
    expect(error.message).toBe('Test error')
    expect(error.status).toBe(404)
    expect(error.code).toBe('NOT_FOUND')
    expect(error.name).toBe('DexScreenerError')
  })

  it('should create error with just message', () => {
    const error = new DexScreenerError('Simple error')
    
    expect(error.message).toBe('Simple error')
    expect(error.status).toBeUndefined()
    expect(error.code).toBeUndefined()
  })
})
