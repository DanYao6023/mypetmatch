'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAnalytics } from '@/app/hooks/useAnalytics';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pageView } = useAnalytics();

  useEffect(() => {
    if (pathname) {
      // 构建完整URL（包括查询参数）
      let url = pathname;
      if (searchParams?.toString()) {
        url += `?${searchParams.toString()}`;
      }
      
      // 发送页面浏览事件
      pageView(url);
    }
  }, [pathname, searchParams, pageView]);

  return null; // 这个组件不渲染任何内容
}