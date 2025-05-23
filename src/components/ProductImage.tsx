
import React, { useState } from 'react';
import VirtualTryOn from './VirtualTryOn';

const ProductImage = () => {
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);

  return (
    <div className="relative">
      {/* Main Product Image */}
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src="/lovable-uploads/c24fff8b-6b83-439b-b858-a042b0bb2d50.png"
          alt="HYSK - Cotton Blend Regular Fit Men's T-Shirt"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Virtual Try-On CTA - Positioned strategically */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowVirtualTryOn(true)}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">Try It On</span>
        </button>
      </div>

      {/* Secondary CTA Banner - Below image for better visibility */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Virtual Try-On</h3>
              <p className="text-sm text-gray-600">See how it looks on you!</p>
            </div>
          </div>
          <button
            onClick={() => setShowVirtualTryOn(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Upload Photo
          </button>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-2 mt-4">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="w-16 h-20 bg-gray-100 rounded-md border-2 border-transparent hover:border-gray-300 cursor-pointer transition-colors"
          >
            <div className="w-full h-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Virtual Try-On Modal */}
      {showVirtualTryOn && (
        <VirtualTryOn onClose={() => setShowVirtualTryOn(false)} />
      )}
    </div>
  );
};

export default ProductImage;
