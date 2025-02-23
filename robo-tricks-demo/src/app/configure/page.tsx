'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the Scene3D component with SSR disabled
const Scene3D = dynamic(
  () => import('@/components/Scene3D').then((mod) => mod.Scene3D),
  { ssr: false }
);

const steps = [
  { id: 1, name: 'Use Case' },
  { id: 2, name: 'Components' },
  { id: 3, name: 'Review' },
  { id: 4, name: 'Quote' },
];

const useCaseExamples = [
  {
    type: 'warehouse',
    icon: '🏭',
    title: 'Warehouse Automation',
    example: 'I need a robot to pick and pack items from shelves in my warehouse'
  },
  {
    type: 'assembly',
    icon: '⚙️',
    title: 'Assembly Line',
    example: 'Looking for a robot to assist with circuit board assembly and soldering'
  },
  {
    type: 'quality',
    icon: '🔍',
    title: 'Quality Control',
    example: 'Need automated visual inspection for product defects on our production line'
  }
];

export default function ConfigurePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [analysis, setAnalysis] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    const step = Number(searchParams.get('step')) || 2;
    setCurrentStep(step);
    
    const storedAnalysis = localStorage.getItem('requirementAnalysis');
    const storedInput = localStorage.getItem('userInput');
    
    if (!storedAnalysis || !storedInput) {
      router.push('/');
      return;
    }

    setAnalysis(storedAnalysis);
    setUserInput(storedInput);
  }, [searchParams, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
              1
            </div>
            <span className="ml-2 text-gray-500">Use Case</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-200"></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center`}>
              2
            </div>
            <span className={`ml-2 ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Components</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-200"></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center`}>
              3
            </div>
            <span className={`ml-2 ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Review</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-200"></div>
          <div className="flex items-center">
            <div className={`w-8 h-8 ${currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} rounded-full flex items-center justify-center`}>
              4
            </div>
            <span className={`ml-2 ${currentStep >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Quote</span>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Analysis and Components */}
        <div className="space-y-6">
          {/* AI Analysis Results */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">AI Analysis Results</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Weight Capacity</span>
                  <span className="text-gray-900">150kg</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Reach Distance</span>
                  <span className="text-gray-900">2.5m</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Speed</span>
                  <span className="text-gray-900">1.2m/s</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Precision</span>
                  <span className="text-gray-900">±0.1mm</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Processing */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Real-time Processing</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-gray-700">Analyzing workspace requirements...</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Load capacity calculation complete</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Movement patterns optimized</span>
              </div>
            </div>
          </div>

          {/* Suggested Components */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Suggested Components</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    🤖
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">RT-2000 Arm</h3>
                  <p className="text-sm text-gray-500">High precision, medium payload</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    🎮
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Smart Controller X1</h3>
                  <p className="text-sm text-gray-500">Advanced path planning</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 3D Visualization */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="aspect-square w-full bg-gray-700 rounded-lg overflow-hidden">
            <Scene3D />
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">Use mouse to rotate and zoom</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Start Over
        </button>
        <button
          onClick={() => router.push('/review')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
} 