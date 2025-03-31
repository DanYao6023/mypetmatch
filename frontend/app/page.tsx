'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAnalytics } from '@/app/hooks/useAnalytics';

export default function Home() {
  const { event } = useAnalytics();

  // 跟踪"Start Test"按钮点击
  const handleStartTestClick = () => {
    event({
      action: 'button_click',
      category: 'engagement',
      label: 'start_test',
    });
  };

  // 跟踪"Browse Pet Encyclopedia"按钮点击
  const handleBrowsePetsClick = () => {
    event({
      action: 'button_click',
      category: 'engagement',
      label: 'browse_pets',
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Pet Compatibility Predictor</h1>
        <p className="text-xl text-gray-700 mb-8">
          Find the perfect pet companion for your lifestyle. Our AI system analyzes your living habits, 
          housing conditions, and available time to recommend the most suitable pet type for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-500 mb-2">Simple Questionnaire</h2>
            <p className="text-gray-600">Answer a few simple questions about your lifestyle</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-500 mb-2">AI Analysis</h2>
            <p className="text-gray-600">Our AI system analyzes your answers and calculates compatibility</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-500 mb-2">Personalized Recommendations</h2>
            <p className="text-gray-600">Get pet recommendations and care advice tailored to you</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link 
            href="/questionnaire" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
            onClick={handleStartTestClick}
          >
            Start Test
          </Link>
          <Link 
            href="/pets" 
            className="inline-block bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
            onClick={handleBrowsePetsClick}
          >
            Browse Pet Encyclopedia
          </Link>
        </div>
        
        {/* Pet Preview Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Explore Different Pet Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['dog', 'cat', 'fish', 'bird', 'hamster'].map((pet, index) => (
              <Link 
                key={index} 
                href="/pets" 
                className="group"
                onClick={() => {
                  event({
                    action: 'pet_preview_click',
                    category: 'engagement',
                    label: pet,
                  });
                }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform group-hover:scale-105">
                  <div className="h-24 md:h-32 overflow-hidden">
                    <Image 
                      src={`https://source.unsplash.com/random/300x200?${pet}`} 
                      alt={pet} 
                      className="w-full h-full object-cover"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="font-medium text-gray-800 capitalize">{pet}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link 
              href="/pets" 
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => {
                event({
                  action: 'link_click',
                  category: 'engagement',
                  label: 'view_more_pets',
                });
              }}
            >
              View More Pet Information →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}