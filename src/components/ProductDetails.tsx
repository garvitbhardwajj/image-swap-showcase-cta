
import React, { useState } from 'react';

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="space-y-4">
      {/* Product Title and Price - Optimized for mobile */}
      <div>
        <div className="text-xs text-green-600 font-medium mb-1">FREE DELIVERY</div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          HYSK - Cotton Blend Regular Fit Men's T-Shirt
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">₹246</span>
          <span className="text-sm text-gray-500 line-through">MRP ₹699</span>
          <span className="text-sm font-semibold text-red-600">42% OFF</span>
        </div>
      </div>

      {/* Rating - More compact for mobile */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-gray-600">4.5 (1k)</span>
      </div>

      {/* Size Selection - Better touch targets for mobile */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-medium text-gray-900">Select size</h3>
          <button className="text-xs text-blue-600 hover:text-blue-700">Size Chart</button>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-center border rounded-lg font-medium transition-all ${
                selectedSize === size
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity - Larger touch targets */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="px-4 py-3 font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Add to Cart Button - Larger for mobile touch */}
      <button className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-base hover:bg-red-700 transition-colors shadow-md sticky bottom-4">
        Buy Now
      </button>

      {/* Product Features - More compact for mobile */}
      <div className="border-t pt-4">
        <h3 className="text-base font-medium text-gray-900 mb-2">Product Details</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">100% Cotton Blend</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Regular Fit</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Machine Washable</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-700">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
