import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // 扩展允许的图片域名
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'localhost',
      '127.0.0.1'
    ],
    // 添加本地图片路径
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ]
  },
  
  // 配置内容安全策略
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com; img-src 'self' data: https: http: blob:;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;