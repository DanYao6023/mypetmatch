'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Questionnaire() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lifestyle: 5,
    living_space: 5,
    time_available: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to AI service
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Prediction request failed');
      }

      const result = await response.json();
      
      // Store results in local storage for use on results page
      localStorage.setItem('petMatchResults', JSON.stringify(result));
      
      // Navigate to results page
      router.push('/results');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Pet Compatibility Questionnaire</h1>
        <p className="text-gray-700 mb-8 text-center">
          Please answer the following questions to help us find the perfect pet companion for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="block">
              <span className="text-lg font-medium text-gray-700">How active is your lifestyle?</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">Quiet/Homebody</span>
                <input
                  type="range"
                  name="lifestyle"
                  min="1"
                  max="10"
                  value={formData.lifestyle}
                  onChange={handleChange}
                  className="w-full mx-4"
                />
                <span className="text-sm text-gray-500">Very Active</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-blue-600 font-medium">{formData.lifestyle}</span>
              </div>
            </label>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-lg font-medium text-gray-700">How large is your living space?</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">Small Apartment</span>
                <input
                  type="range"
                  name="living_space"
                  min="1"
                  max="10"
                  value={formData.living_space}
                  onChange={handleChange}
                  className="w-full mx-4"
                />
                <span className="text-sm text-gray-500">Large House</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-blue-600 font-medium">{formData.living_space}</span>
              </div>
            </label>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-lg font-medium text-gray-700">How much time can you spend with a pet daily?</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">Very Little</span>
                <input
                  type="range"
                  name="time_available"
                  min="1"
                  max="10"
                  value={formData.time_available}
                  onChange={handleChange}
                  className="w-full mx-4"
                />
                <span className="text-sm text-gray-500">A Lot</span>
              </div>
              <div className="text-center mt-1">
                <span className="text-blue-600 font-medium">{formData.time_available}</span>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to Home
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}