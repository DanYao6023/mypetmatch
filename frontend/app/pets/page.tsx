'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define pet info type
interface PetInfo {
  id: string;
  name: string;
  description: string;
  careLevel: string;
  lifespan: string;
  space: string;
  activity: string;
  image: string;
  careInfo: string[];
}

// Pet information data
const petsData: PetInfo[] = [
  {
    id: 'dog',
    name: 'Dog',
    description: 'Dogs are loyal companions known for their devotion and affection. They require regular exercise and social interaction, making them ideal for active households.',
    careLevel: 'Medium-High',
    lifespan: '10-15 years',
    space: 'Medium-Large',
    activity: 'High',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    careInfo: [
      'Requires daily walks and exercise',
      'Regular grooming and bathing',
      'Routine vaccinations and parasite prevention',
      'Socialization and training',
      'Healthy diet and regular veterinary check-ups'
    ]
  },
  {
    id: 'cat',
    name: 'Cat',
    description: 'Cats are independent and elegant pets suitable for households with limited space or a slower pace of life. They are self-sufficient but still need attention and interaction.',
    careLevel: 'Medium',
    lifespan: '12-18 years',
    space: 'Small-Medium',
    activity: 'Medium',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80',
    careInfo: [
      'Clean litter box maintenance',
      'Regular grooming',
      'Scratching posts or cat trees',
      'Routine vaccinations and parasite prevention',
      'Healthy diet and regular veterinary check-ups'
    ]
  },
  {
    id: 'fish',
    name: 'Fish',
    description: 'Fish are low-maintenance pets ideal for busy lifestyles. An aquarium can be a beautiful decoration in your home while providing a relaxing viewing experience.',
    careLevel: 'Low-Medium',
    lifespan: '3-10 years',
    space: 'Small',
    activity: 'Low',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80',
    careInfo: [
      'Regular water changes',
      'Water quality testing and maintenance',
      'Appropriate filtration system',
      'Controlled feeding',
      'Proper temperature and lighting'
    ]
  },
  {
    id: 'bird',
    name: 'Bird',
    description: 'Birds are intelligent and lively pets that bring joy and music to a household. They need social interaction and mental stimulation, making them ideal companions for smaller spaces.',
    careLevel: 'Medium',
    lifespan: '5-15 years',
    space: 'Small',
    activity: 'Medium',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    careInfo: [
      'Spacious cage',
      'Regular cage cleaning',
      'Varied diet',
      'Social interaction and mental stimulation',
      'Regular veterinary check-ups'
    ]
  },
  {
    id: 'hamster',
    name: 'Hamster',
    description: 'Hamsters are small, adorable rodents suitable for households with limited space. They are primarily active during dusk and night, and are relatively easy to care for.',
    careLevel: 'Low-Medium',
    lifespan: '2-3 years',
    space: 'Small',
    activity: 'Medium',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80',
    careInfo: [
      'Spacious cage',
      'Appropriate bedding',
      'Exercise wheel and toys',
      'Proper diet',
      'Quiet environment'
    ]
  }
];

export default function PetsPage() {
  const [selectedPet, setSelectedPet] = useState<PetInfo | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl w-full py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Pet Encyclopedia</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {petsData.map((pet) => (
            <div 
              key={pet.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedPet(pet)}
            >
              <div className="h-48 overflow-hidden">
                <Image 
                  src={pet.image} 
                  alt={pet.name} 
                  className="w-full h-full object-cover"
                  width={500}
                  height={300}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{pet.name}</h2>
                <p className="text-gray-600 line-clamp-3">{pet.description}</p>
                <button 
                  className="mt-4 text-blue-600 font-medium hover:text-blue-800"
                  onClick={() => setSelectedPet(pet)}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/questionnaire"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
          >
            Start Pet Compatibility Test
          </Link>
        </div>
      </div>
      
      {/* Pet Details Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedPet(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="h-64 overflow-hidden">
                <Image 
                  src={selectedPet.image} 
                  alt={selectedPet.name} 
                  className="w-full h-full object-cover"
                  width={800}
                  height={400}
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedPet.name}</h2>
                <p className="text-gray-700 mb-6">{selectedPet.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Care Level:</span>
                    <span className="font-medium">{selectedPet.careLevel}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Lifespan:</span>
                    <span className="font-medium">{selectedPet.lifespan}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Space Needed:</span>
                    <span className="font-medium">{selectedPet.space}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Activity Level:</span>
                    <span className="font-medium">{selectedPet.activity}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Care Guide</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                  {selectedPet.careInfo.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
                </ul>
                
                <div className="text-center mt-6">
                  <Link
                    href="/questionnaire"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
                  >
                    Start Pet Compatibility Test
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}