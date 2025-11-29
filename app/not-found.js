import React from 'react';
import { Home, Droplets } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center">
        {/* Drink icons */}
        <div className="flex justify-center gap-4 mb-8">
          <Droplets className="w-12 h-12 text-gray-800" />
          <Droplets className="w-12 h-12 text-gray-600" />
          <Droplets className="w-12 h-12 text-gray-400" />
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-bold mb-4 text-black">
          404
        </h1>
        
        <h2 className="text-2xl font-medium text-gray-800 mb-3">
          This Flavor Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          This page doesn't exist. Let's get you back to Lexi.
        </p>

        {/* Flavor list */}
        <div className="flex justify-center gap-3 mb-8 text-sm text-gray-500">
          <span>Lime</span>
          <span>•</span>
          <span>Strawberry</span>
          <span>•</span>
          <span>Orange</span>
        </div>

        {/* Action button */}
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors">
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;