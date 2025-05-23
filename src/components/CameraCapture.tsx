
import React, { useEffect, useRef, useState } from 'react';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFullBodyDetected, setIsFullBodyDetected] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Request camera access
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
        });
        
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.addEventListener('loadeddata', () => {
            setIsCameraReady(true);
            // Simulating full body detection after camera loads
            setTimeout(() => setIsFullBodyDetected(true), 2000);
          });
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Unable to access your camera. Please allow camera access and try again.");
      }
    };

    startCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !isCameraReady) return;

    // Start countdown
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount === 1) {
          clearInterval(countdownInterval);
          // Take actual photo when countdown reaches 0
          takePhoto();
          return null;
        }
        return prevCount ? prevCount - 1 : null;
      });
    }, 1000);
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      onCapture(imageDataUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Camera Header */}
      <div className="px-4 py-3 bg-black text-white flex justify-between items-center relative z-10">
        <button onClick={onClose} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-medium">Take a Photo</h2>
        <div className="w-10" />
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden bg-black">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <div className="bg-black/80 p-6 rounded-lg max-w-xs">
              <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-white">{error}</p>
              <button 
                onClick={onClose}
                className="mt-4 bg-white text-black px-4 py-2 rounded-full text-sm font-medium"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        
        {/* Guidance overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Silhouette guide */}
          <div className="absolute inset-10 border-2 border-white/50 rounded-lg"></div>
          
          {/* Full body detection indicator */}
          {isCameraReady && (
            <div className="absolute bottom-24 left-0 right-0 flex justify-center">
              <div className={`px-4 py-2 rounded-full ${isFullBodyDetected ? 'bg-green-500' : 'bg-yellow-500'} text-white text-sm font-medium flex items-center`}>
                {isFullBodyDetected ? (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Full body detected
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Position your full body in frame
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Countdown display */}
          {countdown && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-black/70 flex items-center justify-center">
                <span className="text-white text-5xl font-bold">{countdown}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Camera Controls */}
      <div className="p-4 bg-black">
        {/* Guidance text */}
        <div className="bg-white/10 rounded-lg p-3 mb-6">
          <h4 className="font-medium text-white mb-1 text-sm">For best results:</h4>
          <ul className="text-xs text-white/80 space-y-1">
            <li>• Ensure your full body is visible</li>
            <li>• Stand 8-10 feet away from camera</li>
            <li>• Good lighting from the front</li>
            <li>• Use a plain background</li>
          </ul>
        </div>
        
        {/* Camera button */}
        <div className="flex justify-center">
          <button 
            onClick={capturePhoto}
            disabled={!isCameraReady || countdown !== null}
            className={`w-16 h-16 rounded-full border-4 ${
              isFullBodyDetected ? 'border-green-500' : 'border-white'
            } flex items-center justify-center ${
              !isCameraReady || countdown !== null ? 'opacity-50' : ''
            }`}
          >
            <div className={`w-12 h-12 rounded-full ${isFullBodyDetected ? 'bg-green-500' : 'bg-white'}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
