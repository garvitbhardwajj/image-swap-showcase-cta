
import React, { useState, useRef } from 'react';
import CameraCapture from './CameraCapture';
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface VirtualTryOnProps {
  onClose: () => void;
}

const VirtualTryOn = ({
  onClose
}: VirtualTryOnProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showTryOnResult, setShowTryOnResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCapturePhoto = () => {
    setShowCamera(true);
  };

  const handlePhotoCaptured = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleApplyTryOn = () => {
    setShowTryOnResult(true);
  };

  const handleReturnToCapture = () => {
    setShowTryOnResult(false);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    
    // Check file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setCapturedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // If camera is active, show the camera component
  if (showCamera) {
    return <CameraCapture onCapture={handlePhotoCaptured} onClose={handleCameraClose} />;
  }

  // If showing the virtual try-on result
  if (showTryOnResult) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl w-full max-h-[95vh] overflow-y-auto mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Virtual Try-On Result</h2>
              <p className="text-xs text-gray-600">Here's how the outfit looks on you</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Try-on Result Content */}
          <div className="p-4">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
              {/* This is where the actual try-on would happen. For now, we show a default image */}
              <img 
                src="https://g.sdlcdn.com/imgs/k/w/1/Leotude-Cotton-Blend-Oversized-Fit-SDL726045111-1-96fd0.jpg" 
                alt="Virtual try-on result" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="mt-4 bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-gray-900 mb-1 text-sm">How does it look?</h4>
              <p className="text-xs text-gray-600">
                This is a preview of how the outfit would look on you. In the full version, 
                you'd see your actual photo with the product.
              </p>
            </div>

            {/* Action Buttons - Updated color */}
            <div className="flex space-x-3 mt-4">
              <button 
                onClick={handleReturnToCapture} 
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Try Another Photo
              </button>
              <button 
                onClick={onClose}
                className="flex-1 bg-[#c00309] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#a00208] transition-all duration-300 shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view (upload/take photo)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-h-[95vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Virtual Try-On</h2>
            <p className="text-xs text-gray-600">Upload your photo to see how it looks on you</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {capturedImage ? (
            <div className="mb-4">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img src={capturedImage} alt="Your photo" className="w-full h-full object-cover" />
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCapturedImage(null)} 
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                >
                  Retake Photo
                </button>
                <button 
                  onClick={handleApplyTryOn}
                  className="flex-1 bg-[#c00309] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#a00208] transition-all duration-300 shadow-md"
                >
                  Apply Try-On
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Options - Take Photo or Upload */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                <button 
                  onClick={handleCapturePhoto} 
                  className="bg-[#c00309] text-white p-4 rounded-lg font-medium text-sm hover:bg-[#a00208] transition-all duration-300 shadow-md flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Take a Photo
                </button>
                
                {/* Upload Area - Now connected to file input */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${dragOver ? 'border-[#c00309] bg-red-50' : 'border-gray-300 hover:border-[#c00309]'}`} 
                  onDragOver={handleDragOver} 
                  onDragLeave={handleDragLeave} 
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileInputChange}
                  />
                  <div className="w-12 h-12 bg-[#c00309] rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Upload a Photo</h3>
                  <p className="text-xs text-gray-600 mb-4">Tap to choose or drag and drop</p>
                  <button 
                    className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                  >
                    Choose Photo
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Guidelines */}
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-1 text-sm">For best results:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use a clear, full-body photo</li>
              <li>• Good lighting with minimal shadows</li>
              <li>• Stand against a plain background</li>
              <li>• Keep a neutral pose for accurate visualization</li>
            </ul>
          </div>

          {/* Action Buttons - Updated color */}
          <div className="flex space-x-3 mt-4">
            <button 
              onClick={onClose} 
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              disabled={!capturedImage} 
              onClick={capturedImage ? handleApplyTryOn : undefined}
              className={`flex-1 py-3 rounded-lg font-medium text-sm ${capturedImage ? "bg-[#c00309] text-white hover:bg-[#a00208] transition-all duration-300 shadow-md" : "bg-gray-200 text-gray-400"}`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
