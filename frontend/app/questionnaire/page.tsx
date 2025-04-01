'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAnalytics } from '@/app/hooks/useAnalytics';

// 定义问卷数据接口
interface QuestionnaireData {
  lifestyle: number;
  livingSpace: number;
  timeAvailable: number;
}

export default function QuestionnaireForm() {
  const router = useRouter();
  const { event } = useAnalytics();
  
  // 使用useState钩子管理表单数据
  const [lifestyleValue, setLifestyleValue] = useState<number>(5);
  const [livingSpaceValue, setLivingSpaceValue] = useState<number>(5);
  const [timeValue, setTimeValue] = useState<number>(5);
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 收集表单数据
    const formData: QuestionnaireData = {
      lifestyle: lifestyleValue,
      livingSpace: livingSpaceValue,
      timeAvailable: timeValue,
    };
    
    // 记录分析事件
    event('form_submit', { formData });
    
    console.log('Form submitted:', formData);
    
    // 存储数据到localStorage（可选）
    localStorage.setItem('petMatchData', JSON.stringify(formData));
    
    // 使用多种导航方法确保至少一种能工作
    try {
      // 方法1: 使用window.location.href (最可靠的方法，适用于静态导出)
      window.location.href = '/results/';
    } catch (error) {
      console.error('Navigation error:', error);
      
      // 方法2: 备选方案
      setTimeout(() => {
        window.location.replace('/results/');
      }, 100);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">宠物匹配问卷</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* 生活方式滑块 */}
        <div className="mb-6">
          <label htmlFor="lifestyle" className="block text-lg font-medium mb-2">
            您的生活方式有多活跃？ (1=非常安静, 10=非常活跃)
          </label>
          <input
            type="range"
            id="lifestyle"
            min="1"
            max="10"
            value={lifestyleValue}
            onChange={(e) => setLifestyleValue(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>安静</span>
            <span>适中</span>
            <span>活跃</span>
          </div>
        </div>
        
        {/* 居住空间滑块 */}
        <div className="mb-6">
          <label htmlFor="living-space" className="block text-lg font-medium mb-2">
            您的居住空间有多大？ (1=非常小, 10=非常大)
          </label>
          <input
            type="range"
            id="living-space"
            min="1"
            max="10"
            value={livingSpaceValue}
            onChange={(e) => setLivingSpaceValue(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>小</span>
            <span>中等</span>
            <span>大</span>
          </div>
        </div>
        
        {/* 可用时间滑块 */}
        <div className="mb-6">
          <label htmlFor="time-available" className="block text-lg font-medium mb-2">
            您每天能花多少时间照顾宠物？ (1=很少, 10=很多)
          </label>
          <input
            type="range"
            id="time-available"
            min="1"
            max="10"
            value={timeValue}
            onChange={(e) => setTimeValue(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>很少</span>
            <span>适中</span>
            <span>很多</span>
          </div>
        </div>
        
        {/* 提交按钮 */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-blue-500 hover:underline">
            返回首页
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            提交
          </button>
        </div>
      </form>
    </div>
  );
}