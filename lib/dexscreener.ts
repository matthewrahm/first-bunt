import { z } from 'zod';

// DEX Screener API response schemas
const PairDataSchema = z.object({
  chainId: z.string(),
  dexId: z.string(),
  url: z.string(),
  pairAddress: z.string(),
  baseToken: z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
  }),
  quoteToken: z.object({
    address: z.string(),
    name: z.string(),
    symbol: z.string(),
  }),
  priceNative: z.string().optional(),
  priceUsd: z.string().optional(),
  txns: z.object({
    h24: z.object({
      buys: z.number(),
      sells: z.number(),
    }),
  }),
  volume: z.object({
    h24: z.number().optional(),
    h6: z.number().optional(),
    h1: z.number().optional(),
  }),
  priceChange: z.object({
    h24: z.number().optional(),
    h6: z.number().optional(),
    h1: z.number().optional(),
  }),
  liquidity: z.object({
    usd: z.number().optional(),
    base: z.number().optional(),
    quote: z.number().optional(),
  }),
  fdv: z.number().optional(),
  pairCreatedAt: z.number().optional(),
});

const DexScreenerResponseSchema = z.object({
  pairs: z.array(PairDataSchema),
});

export type PairData = z.infer<typeof PairDataSchema>;
export type DexScreenerResponse = z.infer<typeof DexScreenerResponseSchema>;

// Market stats interface for easy consumption
export interface MarketStats {
  priceUsd: string;
  marketCap: number;
  fdv: number;
  liquidityUsd: number;
  volume24h: number;
  priceChange24h: number;
  dexUrl: string;
  lastUpdated: Date;
}

// Error handling
export class DexScreenerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DexScreenerError';
  }
}

// API client with exponential backoff
export class DexScreenerClient {
  private baseUrl = 'https://api.dexscreener.com/latest/dex';
  private maxRetries = 3;
  private baseDelay = 1000;

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fetchWithRetry(
    url: string,
    retries: number = 0
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'YellowPup/1.0',
        },
        next: {
          revalidate: 15, // Cache for 15 seconds
        },
      });

      if (!response.ok) {
        throw new DexScreenerError(
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return response;
    } catch (error) {
      if (retries < this.maxRetries) {
        const delay = this.baseDelay * Math.pow(2, retries);
        await this.delay(delay);
        return this.fetchWithRetry(url, retries + 1);
      }
      throw error;
    }
  }

  async getPairData(chainId: string, pairId: string): Promise<MarketStats> {
    const url = `${this.baseUrl}/pairs/${chainId}/${pairId}`;

    try {
      const response = await this.fetchWithRetry(url);
      const data = await response.json();

      // Validate response
      const validatedData = DexScreenerResponseSchema.parse(data);

      if (!validatedData.pairs || validatedData.pairs.length === 0) {
        throw new DexScreenerError('No pair data found');
      }

      const pair = validatedData.pairs[0];

      // Calculate market cap (price * total supply - simplified)
      const liquidityUsd = pair.liquidity?.usd || 0;
      const volume24h = pair.volume?.h24 || 0;
      const fdv = pair.fdv || 0;

      // Estimate market cap from liquidity (rough approximation)
      const marketCap = liquidityUsd * 10; // Simplified calculation

      return {
        priceUsd: pair.priceUsd || '0',
        marketCap,
        fdv,
        liquidityUsd,
        volume24h,
        priceChange24h: pair.priceChange?.h24 || 0,
        dexUrl: pair.url,
        lastUpdated: new Date(),
      };
    } catch (error) {
      if (error instanceof DexScreenerError) {
        throw error;
      }

      if (error instanceof z.ZodError) {
        throw new DexScreenerError(`Invalid API response: ${error.message}`);
      }

      throw new DexScreenerError(
        `Failed to fetch pair data: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // Utility method to format numbers
  static formatNumber(value: number): string {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  }

  static formatPercentage(value: number): string {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  }

  static formatPrice(value: string): string {
    const num = parseFloat(value);
    if (num < 0.0001) {
      return `$${num.toExponential(4)}`;
    }
    if (num < 0.01) {
      return `$${num.toFixed(6)}`;
    }
    return `$${num.toFixed(4)}`;
  }
}
