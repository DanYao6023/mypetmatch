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
  
  const [lifestyleValue, setLifestyleValue] = useState<number>(5);
  const [livingSpaceValue, setLivingSpaceValue] = useState<number>(5);
  const [timeValue, setTimeValue] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    // 跟踪提交事件
    event({
      action: 'button_click',
      category: 'form_submission',
      label: 'questionnaire_submit',
    });
    
    console.log('Submit button clicked'); // 调试日志
    setIsSubmitting(true);
    
    try {
      // 收集问卷数据
      const questionnaireData: QuestionnaireData = {
        lifestyle: lifestyleValue,
        livingSpace: livingSpaceValue,
        timeAvailable: timeValue
      };
      
      console.log('Form data:', questionnaireData); // 调试日志
      
      // 将数据存储在localStorage中，以便结果页面可以访问
      localStorage.setItem('questionnaireData', JSON.stringify(questionnaireData));
      
      console.log('Attempting to navigate to results page'); // 调试日志
      
      // 方法1: 使用相对URL (没有前导斜杠)
      window.location.href = 'results';
      
      // 方法2: 如果方法1不起作用，使用创建和点击隐藏链接的方法
      setTimeout(() => {
        if (window.location.pathname.indexOf('/results') === -1) {
          console.log('First navigation attempt failed, trying alternative method');
          const link = document.createElement('a');
          link.href = 'results'; // 使用相对路径
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, 300);
      
      // 方法3: 如果前两种方法都不起作用，尝试使用完整URL
      setTimeout(() => {
        if (window.location.pathname.indexOf('/results') === -1) {
          console.log('Second navigation attempt failed, trying with full URL');
          const baseUrl = window.location.origin;
          const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
          window.location.href = `${baseUrl}${basePath}/results`;
        }
      }, 600);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Pet Compatibility Questionnaire</h1>
        <p className="text-gray-700 mb-8 text-center">
          Please answer the following questions to help us find the perfect pet companion for you.
        </p>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">How active is your lifestyle?</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Quiet/Homebody</span>
              <span className="text-sm text-gray-600">Very Active</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={lifestyleValue}
              onChange={(e) => setLifestyleValue(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-gray-700 mt-1">{lifestyleValue}</div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">How large is your living space?</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Small Apartment</span>
              <span className="text-sm text-gray-600">Large House</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={livingSpaceValue}
              onChange={(e) => setLivingSpaceValue(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-gray-700 mt-1">{livingSpaceValue}</div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">How much time can you spend with a pet daily?</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Very Little</span>
              <span className="text-sm text-gray-600">A Lot</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={timeValue}
              onChange={(e) => setTimeValue(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-gray-700 mt-1">{timeValue}</div>
          </div>
        </div>
        
        <div className="flex justify-between mt-10">
          <Link 
            href="/" 
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Back to Home
          </Link>
          <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </main>
  );
}