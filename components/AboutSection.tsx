'use client';

import { motion } from 'framer-motion';
import { Rocket, Users, Shield, Zap, Star, Heart } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Rocket,
      title: 'Moon Mission',
      description:
        'Built for the community, by the community. Our goal is simple: to the moon and beyond!',
      color: 'from-pink-500 to-purple-500',
    },
    {
      icon: Users,
      title: 'Strong Community',
      description:
        'Join thousands of Bunt Coin holders who believe in the power of community-driven projects.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description:
        'Built on Solana with audited smart contracts and transparent tokenomics.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Solana blockchain ensures instant transactions and minimal fees for all your trading needs.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Star,
      title: 'Innovation First',
      description:
        'Constantly evolving with new features, partnerships, and community-driven initiatives.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description:
        'Every decision is made with the community in mind. Your voice matters!',
      color: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-gold-300">Bunt Coin</span>
          </h2>
          <p className="text-xl text-gold-200 max-w-3xl mx-auto leading-relaxed">
            Bunt Coin is more than just another meme coin. It's a movement, a
            community, and a vision for the future of decentralized finance on
            Solana.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              The Story Behind <span className="text-gold-300">Bunt Coin</span>
            </h3>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Born from the depths of the Solana ecosystem, Bunt Coin emerged
                as a beacon of hope for meme coin enthusiasts who believe in the
                power of community-driven projects.
              </p>
              <p>
                Our journey began with a simple idea: create a token that's not
                just about profits, but about building something meaningful
                together. We wanted to prove that meme coins could be more than
                just speculative assets.
              </p>
              <p>
                Today, Bunt Coin stands as a testament to what's possible when a
                community comes together with a shared vision. We're not just
                holders; we're builders, dreamers, and moon-walkers.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-300">1000+</div>
                <div className="text-sm text-gray-400">Holders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-300">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-300">∞</div>
                <div className="text-sm text-gray-400">Potential</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-300/20 to-gold-500/20 rounded-3xl blur-3xl"></div>

              {/* Main card */}
              <div className="relative bg-ink-800/80 backdrop-blur-sm border border-ink-700 rounded-3xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-300 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-ink-900">BC</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Bunt Coin
                </h4>
                <p className="text-gold-200 mb-6">
                  The most reliable companion in your crypto journey
                </p>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Chain:</span>
                    <span className="text-gold-300">Solana</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-gold-300">Meme Coin</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose <span className="text-gold-300">Bunt Coin</span>?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-ink-800/80 backdrop-blur-sm border border-ink-700 rounded-xl p-6 h-full hover:border-gold-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-300/10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-gradient-to-r from-ink-800/50 to-ink-700/50 border border-ink-600 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Join the <span className="text-gold-300">Bunt Coin</span>{' '}
              Family?
            </h3>
            <p className="text-xl text-gold-200 mb-8 max-w-2xl mx-auto">
              Don't miss out on the next big thing in the Solana ecosystem. Join
              thousands of holders who are already on their way to the moon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#token"
                className="bg-gold-300 hover:bg-gold-200 text-ink-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gold-300/25"
              >
                Get Bunt Coin Now
              </a>
              <a
                href="#live-stats"
                className="border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ink-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                View Live Stats
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
