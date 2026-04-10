import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Add this import

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [hoveredColor, setHoveredColor] = useState(null);

  return (
    <Link to={`/product/${product.id}`} className="block">  {/* Fixed Link implementation */}
      <div className="w-full max-w-sm bg-white p-4 font-sans relative cursor-pointer hover:shadow-lg transition-shadow duration-300">
        {/* Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            -{product.discount}
          </span>
          {product.madeInTaiwan && (
            <span className="bg-[#00adef] text-white text-[10px] px-2 py-1 rounded-sm font-bold">
              Made in Taiwan
            </span>
          )}
        </div>

        {/* Main Product Image */}
        <div className="aspect-square w-full mb-6 flex items-center justify-center overflow-hidden">
          <img
            src={selectedVariant.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-1 mb-4">
          <h3 className="text-gray-800 text-lg font-normal">
            {product.name}
          </h3>
          
          {/* Rating Stars - Fixed to show actual rating */}
          <div className="flex items-center gap-0.5">
            <div className="flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating || 4.5) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-2">{product.reviews} reviews</span>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-base">
              Rs.{product.originalPrice.toLocaleString()} PKR
            </span>
            <span className="text-red-600 font-medium text-base">
              Rs.{product.discountPrice.toLocaleString()} PKR
            </span>
          </div>
        </div>

        {/* Interactive Color Swatches */}
        <div className="flex items-center gap-3 relative">
          {product.variants.map((variant, index) => (
            <div key={index} className="relative group">
              
              {/* Tooltip on Hover */}
              {hoveredColor === variant.colorName && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-[10px] rounded whitespace-nowrap z-20 pointer-events-none">
                  {variant.colorName}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-700"></div>
                </div>
              )}

              {/* Swatch Button */}
              <button
                onMouseEnter={() => setHoveredColor(variant.colorName)}
                onMouseLeave={() => setHoveredColor(null)}
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when clicking color swatch
                  setSelectedVariant(variant);
                }}
                className={`w-5 h-5 rounded-full border border-gray-300 transition-all ${
                  selectedVariant.colorName === variant.colorName 
                  ? 'ring-2 ring-offset-1 ring-black scale-110' 
                  : 'hover:scale-110'
                }`}
                style={{ backgroundColor: variant.hex }}
                aria-label={`Select ${variant.colorName} color`}
              />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;