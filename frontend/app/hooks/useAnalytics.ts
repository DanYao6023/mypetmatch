'use client';

export const useAnalytics = () => {
  // 页面浏览跟踪
  const pageView = (url: string) => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-35LJWHXS47', {
          page_path: url,
        });
        console.log('Pageview tracked:', url);
      } else {
        // 优雅降级 - 只记录日志
        console.log('Pageview (not tracked - gtag unavailable):', url);
      }
    } catch (error) {
      console.error('Error tracking pageview:', error);
    }
  };

  // 事件跟踪
  const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }) => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
        console.log('Event tracked:', { action, category, label, value });
      } else {
        // 优雅降级 - 只记录日志
        console.log('Event (not tracked - gtag unavailable):', { action, category, label, value });
      }
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return { pageView, event };
};

// 为window添加gtag类型
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      params?: Record<string, any> | undefined
    ) => void;
  }
}