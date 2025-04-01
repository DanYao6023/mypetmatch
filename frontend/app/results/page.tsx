'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAnalytics } from '@/app/hooks/useAnalytics';

// Define questionnaire data interface
interface QuestionnaireData {
  lifestyle: number;
  livingSpace: number;
  timeAvailable: number;
}

export default function QuestionnaireForm() {
  const router = useRouter();
  const { event } = useAnalytics();
  
  // Use useState hook to manage form data
  const [lifestyleValue, setLifestyleValue] = useState<number>(5);
  const [livingSpaceValue, setLivingSpaceValue] = useState<number>(5);
  const [timeValue, setTimeValue] = useState<number>(5);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Collect form data
    const formData: QuestionnaireData = {
      lifestyle: lifestyleValue,
      livingSpace: livingSpaceValue,
      timeAvailable: timeValue,
    };
    
    // Log analytics event - fixed type error
    event('form_submit'); // Only pass event name to match useAnalytics definition
    
    console.log('Form submitted:', formData);
    
    // Store data to localStorage (optional)
    localStorage.setItem('petMatchData', JSON.stringify(formData));
    
    // Use window.location.href for navigation - ensure correct path
    try {
      // 确保URL以斜杠结尾，避免重定向问题
      window.location.href = '/results/';
    } catch (error) {
      console.error('Navigation error:', error);
      setTimeout(() => {
        window.location.replace('/results/');
      }, 100);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pet Matching Questionnaire</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Lifestyle slider */}
        <div className="mb-6">
          <label htmlFor="lifestyle" className="block text-lg font-medium mb-2">
            How active is your lifestyle? (1=Very quiet, 10=Very active)
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
            <span>Quiet</span>
            <span>Moderate</span>
            <span>Active</span>
          </div>
        </div>
        
        {/* Living space slider */}
        <div className="mb-6">
          <label htmlFor="living-space" className="block text-lg font-medium mb-2">
            How large is your living space? (1=Very small, 10=Very large)
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
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </div>
        
        {/* Available time slider */}
        <div className="mb-6">
          <label htmlFor="time-available" className="block text-lg font-medium mb-2">
            How much time can you spend caring for a pet each day? (1=Very little, 10=A lot)
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
            <span>Little</span>
            <span>Moderate</span>
            <span>A lot</span>
          </div>
        </div>
        
        {/* Submit button */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}