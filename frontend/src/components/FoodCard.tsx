import Image from 'next/image';
import { FoodItem } from '@/types/food';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

interface FoodCardProps {
  food: FoodItem;
  onViewDetails: (food: FoodItem) => void;
}

export default function FoodCard({ food, onViewDetails }: FoodCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full"
      onClick={() => onViewDetails(food)}
      suppressHydrationWarning
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full">
        <Image
          src={food.image}
          alt={food.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          priority
        />
        
        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite action
          }}
        >
          <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
        
        {/* Popular Badge */}
        {food.isPopular && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2.5 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{food.name}</h3>
          <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold">{food.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {food.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="font-bold text-gray-900 text-lg">
            ${food.price.toFixed(2)}
          </div>
          
          <div className="flex space-x-2">
            {food.isVeg && (
              <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">
                Veg
              </span>
            )}
            {food.isSpicy && (
              <span className="text-xs bg-red-50 text-red-700 px-2.5 py-1 rounded-full border border-red-100">
                Spicy
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
