import { useState } from 'react';
import Image from 'next/image';
import { StarIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { FoodItem } from '@/types/food';

interface FoodDetailProps {
  food: FoodItem;
  quantity?: number;
  onQuantityChange?: (newQuantity: number) => void;
  onAddToCart: () => void;
  onClose: () => void;
}

export default function FoodDetail({ 
  food, 
  quantity: propQuantity,
  onQuantityChange: propOnQuantityChange, 
  onAddToCart,
  onClose
}: FoodDetailProps) {
  const { name, description, price, image, rating, prepTime, isVeg, isSpicy } = food;
  
  // Use local state if props not provided
  const [localQuantity, setLocalQuantity] = useState(propQuantity || 1);
  
  // Use prop callbacks if provided, otherwise use local state
  const quantity = propQuantity !== undefined ? propQuantity : localQuantity;
  const onQuantityChange = propOnQuantityChange || setLocalQuantity;

  const handleIncrement = () => onQuantityChange(quantity + 1);
  const handleDecrement = () => onQuantityChange(Math.max(1, quantity - 1));
  
  const handleAddToCartClick = () => {
    onAddToCart();
    onClose();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative h-64 md:h-auto rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
          
          <p className="mt-2 text-gray-600">{description}</p>
          
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">Prep Time:</span>
              <span className="ml-2 text-sm font-medium">{prepTime} min</span>
            </div>
            <div className="flex items-center space-x-2">
              {isVeg && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Veg
                </span>
              )}
              {isSpicy && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  Spicy
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ${(price * quantity).toFixed(2)}
              {quantity > 1 && (
                <span className="ml-1 text-sm font-normal text-gray-500">
                  (${price.toFixed(2)} each)
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-gray-900">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCartClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
