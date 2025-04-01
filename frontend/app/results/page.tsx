'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Results() {
  const [pet, setPet] = useState<string | null>(null);

  useEffect(() => {
    // 这里可以添加获取结果的逻辑
    // 简单示例：随机选择一个宠物
    const pets = ['猫', '狗', '兔子', '鹦鹉'];
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    setPet(randomPet);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">您的理想宠物匹配结果</h1>
      
      {pet ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl mb-4">根据您的回答，我们推荐您养一只：</p>
          <h2 className="text-4xl font-bold text-blue-600 mb-6">{pet}</h2>
          <p className="mb-6">这种宠物非常适合您的生活方式和偏好。</p>
        </div>
      ) : (
        <p>正在计算您的结果...</p>
      )}
      
      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          返回首页
        </Link>
        {' | '}
        <Link href="/questionnaire/" className="text-blue-500 hover:underline">
          重新测试
        </Link>
      </div>
    </div>
  );
}