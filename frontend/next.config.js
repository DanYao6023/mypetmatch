/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静态导出
  images: {
    unoptimized: true,  // 禁用图像优化
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,  // 确保所有URL都以斜杠结尾
};

module.exports = nextConfig;