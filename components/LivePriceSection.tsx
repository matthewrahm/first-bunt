'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  ExternalLink,
} from 'lucide-react';

interface TokenData {
  price: number;
  marketCap: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  fees24h: number;
  lastUpdated: string;
}

export default function LivePriceSection() {
  const [tokenData, setTokenData] = useState<TokenData>({
    price: 0.2878,
    marketCap: 138820,
    change24h: -22.06,
    volume24h: 10290,
    liquidity: 70440,
    fees24h: 714.27,
    lastUpdated: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  });

  const [isLoading, setIsLoading] = useState(false);

  // Contract address for $BLUNT token
  const contractAddress = 'FILLER_CONTRACT_ADDRESS_HERE'; // Placeholder - waiting for real CA

  // Function to fetch real data from DEX Screener
  const fetchTokenData = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching data for contract:', contractAddress);
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`
      );
      const data = await response.json();

      console.log('DEX Screener response:', data);

      if (data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0]; // Get the first/main pair
        console.log('Using pair:', pair);

        // Extract data from DEX Screener response with fallbacks
        const newData = {
          price: parseFloat(pair.priceUsd) || parseFloat(pair.price) || 0,
          marketCap: parseFloat(pair.marketCap) || parseFloat(pair.mcap) || 0,
          change24h:
            parseFloat(pair.priceChange?.h24) ||
            parseFloat(pair.priceChange24h) ||
            0,
          volume24h:
            parseFloat(pair.volume?.h24) || parseFloat(pair.volume24h) || 0,
          liquidity:
            parseFloat(pair.liquidity?.usd) || parseFloat(pair.liquidity) || 0,
          fees24h: parseFloat(pair.fees?.h24) || parseFloat(pair.fees24h) || 0,
          lastUpdated: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        };

        console.log('Processed data:', newData);
        setTokenData(newData);
      } else {
        console.log('No pairs found in response');
        // Keep existing data if no pairs found
      }
    } catch (error) {
      console.error('Error fetching token data:', error);
      // Keep existing data if fetch fails
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchTokenData();
  }, []);

  // Update data every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchTokenData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(4)}`;
  };

  return (
    <section className="py-20 px-4" id="live-price">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Live Price & Market Cap
          </h2>
          <p className="text-xl text-silver-200 max-w-2xl mx-auto">
            Real-time $BLUNT token data from DEX Screener
          </p>
        </motion.div>

        {/* Main Dashboard */}
        <motion.div
          className="relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-silver-300/20 via-silver-400/20 to-silver-500/20 rounded-3xl blur-3xl scale-110"></div>

          {/* Main Container */}
          <div className="relative bg-ink-800/90 backdrop-blur-sm border border-silver-300/30 rounded-3xl p-8">
            {/* Live Data Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`}
                ></div>
                <span className="text-silver-200 font-medium">
                  {isLoading ? 'Updating...' : 'Live Data'}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={fetchTokenData}
                  disabled={isLoading}
                  className="text-silver-300 hover:text-silver-200 text-sm px-3 py-1 rounded-lg border border-silver-300/30 hover:border-silver-300/60 transition-all duration-300"
                >
                  {isLoading ? 'Updating...' : 'Refresh'}
                </button>
                <div className="text-gray-400 text-sm">
                  Updated {tokenData.lastUpdated}
                </div>
              </div>
            </div>

            {/* Price and Market Cap Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Price Card */}
              <motion.div
                className="bg-ink-700/80 border border-silver-300/20 rounded-2xl p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-silver-300 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-ink-900" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">
                      PRICE (USD)
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {formatPrice(tokenData.price)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Market Cap Card */}
              <motion.div
                className="bg-ink-700/80 border border-silver-300/20 rounded-2xl p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-silver-300 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-ink-900" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">MARKET CAP</div>
                    <div className="text-3xl font-bold text-white">
                      {formatCurrency(tokenData.marketCap)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* 24H Change */}
              <div className="bg-ink-700/60 border border-silver-300/20 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">24H CHANGE</div>
                <div
                  className={`text-lg font-bold ${tokenData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {tokenData.change24h >= 0 ? '+' : ''}
                  {tokenData.change24h.toFixed(2)}%
                </div>
                {tokenData.change24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400 mx-auto mt-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400 mx-auto mt-1" />
                )}
              </div>

              {/* 24H Volume */}
              <div className="bg-ink-700/60 border border-silver-300/20 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">24H VOLUME</div>
                <div className="text-lg font-bold text-white">
                  {formatCurrency(tokenData.volume24h)}
                </div>
              </div>

              {/* Liquidity */}
              <div className="bg-ink-700/60 border border-silver-300/20 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">LIQUIDITY</div>
                <div className="text-lg font-bold text-white">
                  {formatCurrency(tokenData.liquidity)}
                </div>
              </div>

              {/* Fees 24H */}
              <div className="bg-ink-700/60 border border-silver-300/20 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-2">FEES 24H</div>
                <div className="text-lg font-bold text-white">
                  {formatCurrency(tokenData.fees24h)}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={`https://jup.ag/swap?outputMint=${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-silver-300 hover:bg-silver-200 text-ink-900 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5" />
                <span>Buy on Jup.ag</span>
              </motion.a>

              <motion.a
                href={`https://dexscreener.com/solana/${contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-ink-700/80 border border-silver-300 text-silver-300 hover:bg-silver-300 hover:text-ink-900 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span>View on Dexscreener</span>
              </motion.a>
            </div>

            {/* Update Info */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">Updates every 5 min</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
