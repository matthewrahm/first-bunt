'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, QrCode, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';
import {
  useScrollAnimation,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeInScale,
} from '../lib/useScrollAnimation';

interface CASectionProps {
  tokenName: string;
  tokenSymbol: string;
  contractAddress: string;
  chainId: string;
}

export default function CASection({
  tokenName,
  tokenSymbol,
  contractAddress,
  chainId,
}: CASectionProps) {
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.1, delay: 200 });
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      toast.success('Contract address copied to clipboard!', {
        icon: '📋',
        style: {
          background: '#111111',
          color: '#F5D76E',
          border: '1px solid #F5D76E',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy address', {
        icon: '❌',
        style: {
          background: '#111111',
          color: '#F5D76E',
          border: '1px solid #F5D76E',
        },
      });
    }
  };

  // Generate QR code
  const generateQRCode = async () => {
    if (!showQR) {
      try {
        const qrDataUrl = await QRCode.toDataURL(contractAddress, {
          width: 200,
          margin: 2,
          color: {
            dark: '#F5D76E',
            light: '#0B0B0B',
          },
        });
        setQrCodeDataUrl(qrDataUrl);
        setShowQR(true);
      } catch (err) {
        toast.error('Failed to generate QR code', {
          icon: '❌',
          style: {
            background: '#111111',
            color: '#F5D76E',
            border: '1px solid #F5D76E',
          },
        });
      }
    } else {
      setShowQR(false);
    }
  };

  // Get explorer URL based on chain
  const getExplorerUrl = () => {
    switch (chainId.toLowerCase()) {
      case 'solana':
        return `https://solscan.io/token/${contractAddress}`;
      case 'ethereum':
        return `https://etherscan.io/token/${contractAddress}`;
      case 'bsc':
        return `https://bscscan.com/token/${contractAddress}`;
      default:
        return `https://explorer.${chainId}.org/token/${contractAddress}`;
    }
  };

  // Truncate address for display
  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <section className="py-20 px-4" id="token" ref={elementRef}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-gold-300">{tokenName}</span> Token
          </h2>
          <p className="text-xl text-gold-200 max-w-2xl mx-auto">
            Get your hands on {tokenSymbol} tokens. Copy the contract address
            below to add to your wallet.
          </p>
        </motion.div>

        {/* Token Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Token Details */}
          <motion.div
            className="bg-ink-800/80 backdrop-blur-sm border border-ink-700 rounded-xl p-8"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-300 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-ink-900">
                  {tokenSymbol[0]}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {tokenName}
              </h3>
              <p className="text-gold-200 text-lg mb-4">
                Symbol: {tokenSymbol}
              </p>
              <div className="inline-flex items-center gap-2 bg-ink-700/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Chain: {chainId}</span>
              </div>
            </div>
          </motion.div>

          {/* Contract Address */}
          <motion.div
            className="bg-ink-800/80 backdrop-blur-sm border border-ink-700 rounded-xl p-8"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={fadeInRight}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Contract Address
            </h3>

            {/* Address Display */}
            <div className="bg-ink-900/50 border border-ink-600 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <code className="text-gold-300 font-mono text-sm break-all">
                  {truncateAddress(contractAddress)}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="ml-4 p-2 hover:bg-ink-700 rounded-lg transition-colors group"
                  aria-label="Copy contract address"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-gold-300 group-hover:text-gold-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={generateQRCode}
                className="flex-1 flex items-center justify-center gap-2 bg-gold-300 hover:bg-gold-200 text-ink-900 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <QrCode className="w-5 h-5" />
                {showQR ? 'Hide QR' : 'Show QR'}
              </button>

              <a
                href={getExplorerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-ink-700 hover:bg-ink-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Explorer
              </a>
            </div>

            {/* QR Code */}
            {showQR && qrCodeDataUrl && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-block p-4 bg-white rounded-lg">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code for contract address"
                    className="w-32 h-32"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Scan to copy contract address
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-ink-800/50 border border-ink-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              How to Add {tokenSymbol}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="w-12 h-12 bg-gold-300/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">1</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Copy Address</h4>
                <p className="text-sm text-gray-300">
                  Copy the contract address above
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gold-300/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">2</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Add to Wallet</h4>
                <p className="text-sm text-gray-300">
                  Import custom token in your wallet
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gold-300/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">3</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Start Trading</h4>
                <p className="text-sm text-gray-300">
                  Buy and sell on supported DEXs
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
