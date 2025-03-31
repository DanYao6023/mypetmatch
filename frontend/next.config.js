/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // 静态导出
    images: {
      unoptimized: true,  // 禁用图像优化
    },
    // 禁用ESLint检查，这可能会导致构建失败
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;