import Image from 'next/image';
import { Minus, Plus, Star, Heart, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/buttons/Button';
import { Modal } from '@/components/ui/Modal';
import { FoodItem } from '@/types/food';

interface FoodDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: FoodItem | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  isAddingToCart?: boolean;
}

export function FoodDetailModal({
  isOpen,
  onClose,
  food,
  quantity,
  onQuantityChange,
  onAddToCart,
  isAddingToCart = false,
}: FoodDetailModalProps) {
  if (!food) return null;

  const { name, description, price, image, rating, prepTime, isVeg, isSpicy, calories } = food;

  const handleIncrement = () => onQuantityChange(quantity + 1);
  const handleDecrement = () => onQuantityChange(Math.max(1, quantity - 1));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      closeOnClickOutside
      closeOnEsc
      showCloseButton
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Food Image */}
        <div className="relative h-64 md:h-full rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
            {food.isPopular && (
              <Badge variant="warning" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Popular
              </Badge>
            )}
            {isVeg && (
              <Badge variant="success" className="bg-white/90">
                Veg
              </Badge>
            )}
            {isSpicy && (
              <Badge variant="danger" className="bg-white/90">
                Spicy
              </Badge>
            )}
          </div>
        </div>

        {/* Food Details */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
              <span className="mx-2 text-gray-300">•</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span>{prepTime || '15-20'} min</span>
              {calories && (
                <>
                  <span className="mx-2 text-gray-300">•</span>
                  <span>{calories} cal</span>
                </>
              )}
            </div>
          </div>

          <p className="text-gray-700 mb-6">{description}</p>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-gray-900">
                ${(price * quantity).toFixed(2)}
                {quantity > 1 && (
                  <span className="ml-1 text-sm font-normal text-gray-500">
                    (${price.toFixed(2)} each)
                  </span>
                )}
              </span>
              
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={handleDecrement}
                  className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-full transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-full transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={onAddToCart}
              className="w-full py-3 text-base font-medium"
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
