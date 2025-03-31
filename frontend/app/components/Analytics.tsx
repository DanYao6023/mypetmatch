'use client';
   
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Analytics() {
  const [scriptError, setScriptError] = useState(false);
  
  useEffect(() => {
    console.log('Analytics component mounted');
    // 检测是否可以访问Google服务
    const checkGoogleAccess = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        await fetch('https://www.google.com/generate_204', { 
          mode: 'no-cors',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        console.log('Google services may be accessible');
      } catch (error) {
        console.warn('Google services may be inaccessible in your region');
        setScriptError(true);
      }
    };
    
    checkGoogleAccess();
  }, []);

  // 如果已知Google服务不可访问，直接提供fallback
  if (scriptError) {
    return (
      <Script
        id="analytics-fallback"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            console.log('Using analytics fallback');
            window.gtag = function() {
              console.log('Fallback gtag called:', arguments);
            };
          `,
        }}
      />
    );
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-35LJWHXS47`}
        onLoad={() => {
          console.log('Google Analytics script loaded successfully');
        }}
        onError={(e) => {
          console.error('Google Analytics script failed to load', e);
          setScriptError(true);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-35LJWHXS47');
            console.log('Google Analytics initialized');
          `,
        }}
      />
    </>
  );
}