// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = {
  reactStrictMode: true,

  swcMinify: false,

  experimental: {
    fallbackNodePolyfills: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  distDir: 'build',

  poweredByHeader: false,

  sentry: {
    hideSourceMaps: true,
  },
}

module.exports = withSentryConfig(nextConfig, { silent: true })
