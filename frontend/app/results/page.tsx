'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/app/hooks/useAnalytics';

// 定义问卷数据和结果的接口
interface QuestionnaireData {
  lifestyle: number;
  livingSpace: number;
  timeAvailable: number;
}

interface PetMatch {
  pet: string;
  description: string;
}

export default function Results() {
  const [results, setResults] = useState<PetMatch | null>(null);
  const { event } = useAnalytics();
  
  useEffect(() => {
    // 从localStorage获取问卷数据
    const storedData = localStorage.getItem('questionnaireData');
    if (storedData) {
      try {
        const data: QuestionnaireData = JSON.parse(storedData);
        // 计算宠物匹配结果
        const petMatch = calculatePetMatch(data);
        setResults(petMatch);
        
        // 跟踪结果页面查看事件
        event({
          action: 'view_results',
          category: 'engagement',
          label: petMatch.pet,
        });
      } catch (error) {
        console.error('Error parsing questionnaire data:', error);
      }
    }
  }, [event]);
  
  // 宠物匹配计算函数
  const calculatePetMatch = (data: QuestionnaireData): PetMatch => {
    const { lifestyle, livingSpace, timeAvailable } = data;
    
    // 匹配逻辑
    if (lifestyle >= 7 && timeAvailable >= 7) {
      return { pet: 'Dog', description: 'Active and social, dogs make great companions for active people with time to spend with them.' };
    } else if (livingSpace <= 4 && timeAvailable <= 5) {
      return { pet: 'Fish', description: 'Low maintenance and peaceful, fish are perfect for busy people with limited space.' };
    } else if (lifestyle <= 5 && timeAvailable >= 5) {
      return { pet: 'Cat', description: 'Independent yet affectionate, cats are ideal for those who enjoy a balanced lifestyle.' };
    } else if (livingSpace <= 5 && lifestyle <= 6) {
      return { pet: 'Hamster', description: 'Compact and entertaining, hamsters are great for those with limited space.' };
    } else {
      return { pet: 'Bird', description: 'Cheerful and relatively low-maintenance, birds bring joy to many different living situations.' };
    }
  };
  
  const handleBackHomeClick = () => {
    // 跟踪返回首页事件
    event({
      action: 'button_click',
      category: 'navigation',
      label: 'back_to_home_from_results',
    });
  };
  
  if (!results) {
    return <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center p-8">Loading results...</div>
    </div>;
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Perfect Pet Match</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">We recommend: {results.pet}</h2>
          <p className="text-lg text-gray-700">{results.description}</p>
        </div>
        
        <div className="mt-10">
          <Link 
            href="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
            onClick={handleBackHomeClick}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}