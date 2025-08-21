import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CASection from '@/components/CASection'

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock qrcode
vi.mock('qrcode', () => ({
  toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mock-qr-code'),
}))

describe('CASection', () => {
  const defaultProps = {
    tokenName: 'Yellow Pup',
    tokenSymbol: 'YPUP',
    contractAddress: 'So11111111111111111111111111111111111111112',
    chainId: 'solana',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders token information correctly', () => {
    render(<CASection {...defaultProps} />)
    
    expect(screen.getByText('Yellow Pup Token')).toBeInTheDocument()
    expect(screen.getByText('YPUP')).toBeInTheDocument()
    expect(screen.getByText('Chain: solana')).toBeInTheDocument()
  })

  it('displays truncated contract address', () => {
    render(<CASection {...defaultProps} />)
    
    const addressElement = screen.getByText(/So1111\.\.\.11111112/)
    expect(addressElement).toBeInTheDocument()
  })

  it('shows full address in code element', () => {
    render(<CASection {...defaultProps} />)
    
    const codeElement = screen.getByText(/So1111\.\.\.11111112/)
    expect(codeElement.tagName).toBe('CODE')
  })

  it('has copy button with correct aria-label', () => {
    render(<CASection {...defaultProps} />)
    
    const copyButton = screen.getByLabelText('Copy contract address')
    expect(copyButton).toBeInTheDocument()
  })

  it('shows QR code toggle button', () => {
    render(<CASection {...defaultProps} />)
    
    const qrButton = screen.getByText('Show QR')
    expect(qrButton).toBeInTheDocument()
  })

  it('shows explorer button with correct link', () => {
    render(<CASection {...defaultProps} />)
    
    const explorerButton = screen.getByText('Explorer')
    expect(explorerButton).toBeInTheDocument()
    expect(explorerButton.closest('a')).toHaveAttribute(
      'href',
      'https://solscan.io/token/So11111111111111111111111111111111111111112'
    )
  })

  it('displays how-to steps', () => {
    render(<CASection {...defaultProps} />)
    
    expect(screen.getByText('How to Add YPUP')).toBeInTheDocument()
    expect(screen.getByText('Copy Address')).toBeInTheDocument()
    expect(screen.getByText('Add to Wallet')).toBeInTheDocument()
    expect(screen.getByText('Start Trading')).toBeInTheDocument()
  })

  it('generates correct explorer URL for different chains', () => {
    const { rerender } = render(<CASection {...defaultProps} chainId="ethereum" />)
    
    let explorerButton = screen.getByText('Explorer')
    expect(explorerButton.closest('a')).toHaveAttribute(
      'href',
      'https://etherscan.io/token/So11111111111111111111111111111111111111112'
    )

    rerender(<CASection {...defaultProps} chainId="bsc" />)
    explorerButton = screen.getByText('Explorer')
    expect(explorerButton.closest('a')).toHaveAttribute(
      'href',
      'https://bscscan.com/token/So11111111111111111111111111111111111111112'
    )
  })

  it('handles very short addresses correctly', () => {
    const shortAddress = '123456789'
    render(<CASection {...defaultProps} contractAddress={shortAddress} />)
    
    expect(screen.getByText(shortAddress)).toBeInTheDocument()
  })

  it('handles very long addresses correctly', () => {
    const longAddress = 'So11111111111111111111111111111111111111112So11111111111111111111111111111111111111112'
    render(<CASection {...defaultProps} contractAddress={longAddress} />)
    
    expect(screen.getByText(/So1111\.\.\.11111112/)).toBeInTheDocument()
  })
})
