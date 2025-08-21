'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { DexScreenerClient, MarketStats } from '@/lib/dexscreener';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Coins,
  Activity,
} from 'lucide-react';

interface StatsTickerProps {
  chainId: string;
  pairId: string;
  pollInterval?: number;
}

// Stats card component
function StatCard({
  title,
  value,
  change,
  icon: Icon,
  isLoading,
  error,
}: {
  title: string;
  value: string;
  change?: number;
  icon: any;
  isLoading: boolean;
  error?: string;
}) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      className="bg-ink-800/80 backdrop-blur-sm border border-ink-700 rounded-xl p-6 hover:border-gold-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-300/10"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gold-300/10 rounded-lg">
          <Icon className="w-6 h-6 text-gold-300" />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${
              isPositive
                ? 'text-green-400'
                : isNegative
                  ? 'text-red-400'
                  : 'text-gray-400'
            }`}
          >
            {isPositive && <TrendingUp className="w-4 h-4 mr-1" />}
            {isNegative && <TrendingDown className="w-4 h-4 mr-1" />}
            {change !== 0 && `${change > 0 ? '+' : ''}${change.toFixed(2)}%`}
          </div>
        )}
      </div>

      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>

      {isLoading ? (
        <div className="h-8 bg-ink-700/50 rounded animate-pulse"></div>
      ) : error ? (
        <p className="text-red-400 text-sm">{error}</p>
      ) : (
        <p className="text-2xl font-bold text-white">{value}</p>
      )}
    </motion.div>
  );
}

export default function StatsTicker({
  chainId,
  pairId,
  pollInterval = 15000,
}: StatsTickerProps) {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // SWR fetcher function
  const fetcher = async () => {
    try {
      const client = new DexScreenerClient();
      const data = await client.getPairData(chainId, pairId);
      setError(null);
      setLastUpdate(new Date());
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      throw err;
    }
  };

  // Set client flag on mount to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // SWR hook with polling
  const {
    data: stats,
    error: swrError,
    isLoading,
  } = useSWR<MarketStats>(`dex-screener-${chainId}-${pairId}`, fetcher, {
    refreshInterval: pollInterval,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  // Format stats for display
  const formatStats = (stats: MarketStats) => ({
    price: DexScreenerClient.formatPrice(stats.priceUsd),
    marketCap: DexScreenerClient.formatNumber(stats.marketCap),
    fdv: DexScreenerClient.formatNumber(stats.fdv),
    liquidity: DexScreenerClient.formatNumber(stats.liquidityUsd),
    volume: DexScreenerClient.formatNumber(stats.volume24h),
    priceChange: stats.priceChange24h,
  });

  // Error banner
  if (swrError && !stats) {
    return (
      <motion.div
        className="max-w-4xl mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-red-400 text-xl font-bold mb-2">
            Market Data Unavailable
          </h3>
          <p className="text-gray-300 mb-4">
            {swrError.message || 'Failed to fetch live market data'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  const formattedStats = stats ? formatStats(stats) : null;

  return (
    <section className="py-20 px-4" id="live-stats">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Live <span className="text-gold-300">Market Stats</span>
          </h2>
          <p className="text-xl text-gold-200 max-w-2xl mx-auto">
            Real-time data from DEX Screener. Updated every{' '}
            {isClient ? pollInterval / 1000 : '--'} seconds.
          </p>

          {/* Last update indicator */}
          {lastUpdate && isClient && (
            <div className="mt-4 text-sm text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard
            title="Price (USD)"
            value={formattedStats?.price || '--'}
            change={formattedStats?.priceChange}
            icon={DollarSign}
            isLoading={isLoading}
            error={error || undefined}
          />

          <StatCard
            title="Market Cap"
            value={formattedStats?.marketCap || '--'}
            icon={Coins}
            isLoading={isLoading}
            error={error || undefined}
          />

          <StatCard
            title="Fully Diluted Value"
            value={formattedStats?.fdv || '--'}
            icon={BarChart3}
            isLoading={isLoading}
            error={error || undefined}
          />

          <StatCard
            title="Liquidity (USD)"
            value={formattedStats?.liquidity || '--'}
            icon={Activity}
            isLoading={isLoading}
            error={error || undefined}
          />

          <StatCard
            title="24h Volume"
            value={formattedStats?.volume || '--'}
            icon={TrendingUp}
            isLoading={isLoading}
            error={error || undefined}
          />

          <StatCard
            title="Price Change (24h)"
            value={
              formattedStats?.priceChange
                ? `${formattedStats.priceChange > 0 ? '+' : ''}${formattedStats.priceChange.toFixed(2)}%`
                : '--'
            }
            change={formattedStats?.priceChange}
            icon={TrendingUp}
            isLoading={isLoading}
            error={error || undefined}
          />
        </div>

        {/* View Chart Button */}
        {stats?.dexUrl && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href={stats.dexUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold-300 hover:bg-gold-200 text-ink-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gold-300/25"
            >
              <BarChart3 className="w-6 h-6" />
              View Chart on Dexscreener
            </a>
          </motion.div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-flex items-center gap-2 text-gold-300">
              <div className="w-4 h-4 border-2 border-gold-300 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Updating...</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
