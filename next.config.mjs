/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // webpack(config) {
  //   config.experiments = {
  //     asyncWebAssembly: true,
  //     layers: true,
  //   };

  //   return config;
  // },

  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true, asyncWebAssembly: true,
          layers: true, };
    return config;
  },
}

export default nextConfig