'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Define pet info type
interface PetInfo {
  name: string;
  description: string;
  careLevel: string;
  lifespan: string;
  space: string;
  activity: string;
  image: string;
}

// Define results type
interface PetMatchResults {
  scores: Record<string, number>;
  // 添加其他可能的属性
}

// Pet information data
const petInfoData: Record<string, PetInfo> = {
  dog: {
    name: 'Dog',
    description: 'Dogs are loyal companions known for their devotion and affection. They require regular exercise and social interaction, making them ideal for active households.',
    careLevel: 'Medium-High',
    lifespan: '10-15 years',
    space: 'Medium-Large',
    activity: 'High',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  cat: {
    name: 'Cat',
    description: 'Cats are independent and elegant pets suitable for households with limited space or a slower pace of life. They are self-sufficient but still need attention and interaction.',
    careLevel: 'Medium',
    lifespan: '12-18 years',
    space: 'Small-Medium',
    activity: 'Medium',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80'
  },
  fish: {
    name: 'Fish',
    description: 'Fish are low-maintenance pets ideal for busy lifestyles. An aquarium can be a beautiful decoration in your home while providing a relaxing viewing experience.',
    careLevel: 'Low-Medium',
    lifespan: '3-10 years',
    space: 'Small',
    activity: 'Low',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80'
  },
  bird: {
    name: 'Bird',
    description: 'Birds are intelligent and lively pets that bring joy and music to a household. They need social interaction and mental stimulation, making them ideal companions for smaller spaces.',
    careLevel: 'Medium',
    lifespan: '5-15 years',
    space: 'Small',
    activity: 'Medium',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
  },
  hamster: {
    name: 'Hamster',
    description: 'Hamsters are small, adorable rodents suitable for households with limited space. They are primarily active during dusk and night, and are relatively easy to care for.',
    careLevel: 'Low-Medium',
    lifespan: '2-3 years',
    space: 'Small',
    activity: 'Medium',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80'
  }
};

export default function Results() {
  const router = useRouter();
  const [results, setResults] = useState<PetMatchResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get results from local storage
    const storedResults = localStorage.getItem('petMatchResults');
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Redirect to questionnaire if no results found
      router.push('/questionnaire');
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-gray-700">Loading results...</div>
      </main>
    );
  }

  if (!results) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-gray-700">No results found. Please take the questionnaire first.</div>
        <Link
          href="/questionnaire"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
        >
          Go to Questionnaire
        </Link>
      </main>
    );
  }

  // Get the best match (highest score)
  const bestMatch = Object.entries(results.scores).reduce(
    (a, b) => (b[1] > a[1] ? b : a)
  )[0];

  // Get pet info for the best match
  const petInfo = petInfoData[bestMatch];
  
  // Get match score (percentage)
  const matchScore = Math.round(results.scores[bestMatch]);
  
  // Sort all scores from highest to lowest
  const sortedScores = Object.entries(results.scores)
    .sort((a, b) => b[1] - a[1])
    .map(([pet, score]) => [pet, Math.round(score)]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl w-full py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Your Pet Compatibility Results</h1>
        
        {/* Best match section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <Image 
                src={petInfo.image} 
                alt={petInfo.name} 
                className="w-full h-full object-cover"
                width={500}
                height={300}
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Best Match: {petInfo.name}</h2>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="text-lg font-medium mr-2">Compatibility Score:</div>
                <div className="relative w-full max-w-xs h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                    style={{ width: `${matchScore}%` }}
                  ></div>
                </div>
                <div className="ml-2 text-lg font-bold text-blue-600">{matchScore}%</div>
              </div>
              
              <p className="text-gray-700 mb-4">{petInfo.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Care Level:</span>
                  <span className="font-medium">{petInfo.careLevel}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Lifespan:</span>
                  <span className="font-medium">{petInfo.lifespan}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Space Needed:</span>
                  <span className="font-medium">{petInfo.space}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Activity Level:</span>
                  <span className="font-medium">{petInfo.activity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* All pet compatibility rankings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Pet Compatibility Rankings</h2>
          
          <div className="space-y-4">
            {sortedScores.map(([pet, score]) => (
              <div key={pet} className="flex items-center">
                <div className="w-20 text-gray-700">{petInfoData[pet].name}</div>
                <div className="flex-1 mx-4">
                  <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        pet === bestMatch ? 'bg-blue-600' : 'bg-blue-400'
                      }`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right font-medium">{score}%</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <Link
            href="/questionnaire"
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition-colors duration-300"
          >
            Retake Test
          </Link>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}