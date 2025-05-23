
import React, { useState } from 'react';

interface VirtualTryOnProps {
  onClose: () => void;
}

const VirtualTryOn = ({ onClose }: VirtualTryOnProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
    console.log('File dropped');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-h-[95vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Virtual Try-On</h2>
            <p className="text-xs text-gray-600">Upload your photo to see how it looks on you</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">Upload Your Photo</h3>
            <p className="text-xs text-gray-600 mb-4">Tap to choose or drag and drop</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md">
              Choose Photo
            </button>
          </div>

          {/* Guidelines */}
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-1 text-sm">For best results:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use a clear, front-facing photo</li>
              <li>• Good lighting with minimal shadows</li>
              <li>• Stand against a plain background</li>
              <li>• Wear fitted clothing for accurate visualization</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md">
              Start Try-On
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
