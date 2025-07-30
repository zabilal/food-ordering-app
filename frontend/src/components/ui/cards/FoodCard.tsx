import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../buttons/Button';
import { cn } from '@/lib/utils';
import { FoodItem } from '@/types/food';

interface FoodCardProps extends React.HTMLAttributes<HTMLDivElement> {
  food: FoodItem;
  onFavoriteToggle?: (food: FoodItem) => void;
  onAddToCart?: (food: FoodItem) => void;
  className?: string;
}

export function FoodCard({
  food,
  onFavoriteToggle,
  onAddToCart,
  className,
  ...props
}: FoodCardProps) {
  const { name, description, price, image, rating, isFavorite, isPopular, category } = food;

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md',
        className
      )}
      {...props}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.(food);
          }}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            strokeWidth={2}
          />
        </button>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {isPopular && (
            <Badge variant="warning" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Popular
            </Badge>
          )}
          {category && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
              {category}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className="ml-2 whitespace-nowrap text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <p className="mb-4 flex-1 text-sm text-gray-600">
          {description.length > 80 ? `${description.substring(0, 80)}...` : description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">
              {rating.toFixed(1)}
            </span>
            <span className="mx-1 text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {food.prepTime || '15-20'} min
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(food);
            }}
            aria-label="Add to cart"
          >
            <span className="text-lg">+</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
