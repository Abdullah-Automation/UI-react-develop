const { withSentryConfig } = require('@sentry/nextjs');
const { createSecureHeaders } = require('next-secure-headers');
const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/styles',
  '@mui/x-date-pickers',
]); // add this line

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  env: {
    API_URL: process.env.API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async headers() {
    if (process.env.NO_CSP === 'true') {
      return []; // No headers are added if NO_CSP is true
    }

    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              frameAncestors: [
                "'self'",
                'ryans-business-site-5e4e48.webflow.io',
                'www.speechlab.ai',
                'speechs-exceptional-site-4eb581.webflow.io',
              ],
              defaultSrc: [
                "'self'",
                'blob:', // Added 'blob:' here
                'https://jam.dev',
                'blob:',
                'i.imgur.com',
                'data:',
              ],
              styleSrc: [
                "'self'",
                'blob:', // Added 'blob:' here
                "'unsafe-inline'",
                'https://fonts.googleapis.com',
                'https://cdn.paddle.com',
              ],
              scriptSrc: [
                "'self'",
                'blob:', // Added 'blob:' here
                'https://static.zdassets.com',
                'https://cdn.segment.com',
                'https://www.googletagmanager.com',
                'http://www.googletagmanager.com',
                'http://static.woopra.com',
                'https://www.woopra.com',
                'https://cdn.paddle.com',
                'https://bam-cell.nr-data.net',
                'https://ld.paddle.com/',
                'https://checkout-service.paddle.com',
                'https://create-checkout.paddle.com',
                'https://paddle.s3.amazonaws.com',
                'https://buy.paddle.com/',
                "'unsafe-eval'",
                "'unsafe-inline'",
              ], // Allow 'unsafe-eval'
              connectSrc: [
                "'self'",
                'blob:', // Added 'blob:' here
                'https://ekr.zdassets.com',
                'https://*.google.com',
                'https://*.google.uk',
                'https://*.analytics.google.com/',
                'https://*.googletagmanager.com/',
                'https://speechlab.zendesk.com',
                'https://*.ingest.sentry.io',
                'https://cdn.segment.com/',
                'https://api.segment.io/',
                'wss://widget-mediator.zopim.com',
                'https://www.woopra.com',
                'http://www.woopra.com',
                'http://localhost/',
                'https://speechlab-dev.speechlab.ai/',
                'https://translate.speechlab.ai/',
                'https://translate-staging.speechlab.ai/',
                'https://api-translate-dev.speechlab.ai/',
                'https://translate-api.speechlab.ai/',
                'https://speechlab-data-dev.s3.amazonaws.com/',
                'https://speechlab-data-prod.s3.amazonaws.com/',
                'https://speechlab-pearson-data-dev.s3.amazonaws.com/',
                'https://speechlab-pearson-data-prod.s3.amazonaws.com/',
                'https://cdn.paddle.com',
                'https://sandbox.cdn.paddle.com',
                'https://www.woopra.com/track/push/',
                'https://bam-cell.nr-data.net',
                'https://ld.paddle.com/',
                'https://create-checkout.paddle.com',
                'https://checkout-service.paddle.com',
                'wss://speechlab-dev.speechlab.ai',
                'wss://translate.speechlab.ai',
                'wss://translate-api-staging.speechlab.ai',
                'https://translate-api-staging.speechlab.ai',
                'https://*.doubleclick.net',
              ], // Allow connections to 'https://speechlab.zendesk.com'
              fontSrc: ["'self'", 'https://fonts.gstatic.com'],
              imgSrc: [
                "'self'",
                'data:',
                'blob:', // Added 'blob:' here
                'i.imgur.com',
                'https://www.googletagmanager.com/',
                'https://cdn.paddle.com',
                'https://paddle.s3.amazonaws.com/',
                'https://buy.paddle.com/',
              ],
              // other directives...
              workerSrc: ["'self'", 'blob:'], // Add your sources here
              childSrc: [
                "'self'",
                'blob:',
                'https://jam.dev',
                'i.imgur.com',
                'data:',
                'https://sandbox-buy.paddle.com',
              ], // Add the URL here
              mediaSrc: [
                "'self'",
                'blob:', // Added 'blob:' here
                'https://static.zdassets.com',
                'https://speechlab-data-dev.s3.amazonaws.com/',
                'https://speechlab-data-prod.s3.amazonaws.com/',
                'https://speechlab-pearson-data-dev.s3.amazonaws.com/',
                'https://speechlab-pearson-data-prod.s3.amazonaws.com/',
                'https://paddle.s3.amazonaws.com/',
                'https://cdn.paddle.com',
                'https://speechlab-dev.speechlab.ai',
                'https://translate.speechlab.ai',
                'https://translate-api-staging.speechlab.ai',
              ], // Allow media from 'https://static.zdassets.com'
              frameSrc: [
                'https://sandbox-buy.paddle.com',
                'https://buy.paddle.com/',
              ], // Create a new directive

              // Add other directives as needed
            },
          },
          // Other secure headers here
        }),
      },
    ];
  },
};

const moduleExports = withTM({
  // Your existing module.exports
  ...nextConfig,

  productionBrowserSourceMaps: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Modify the production webpack config to add a source map plugin
      config.devtool = 'source-map';
    }

    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },

  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/next.js` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,

    // This option will automatically provide performance monitoring for Next.js
    // data-fetching methods and API routes, making the manual wrapping of API
    // routes via `withSentry` redundant.
    autoInstrumentServerFunctions: true,
  },
});

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  ignore: ['@mui/material', '@mui/styles', 'node_modules'],
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
