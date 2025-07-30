'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FoodListing from '@/features/food/FoodListingClient';
import { FoodItem, FoodCategory } from '@/types/food';
import { mockFoods, mockCategories } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import Modal from '@/components/ui/Modal';
import FoodDetail from '@/features/food/FoodDetail';

export default function HomePage() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleViewDetails = (food: FoodItem) => {
    setSelectedFood(food);
    setQuantity(1); // Reset quantity when opening a new food item
  };

  const handleCloseModal = () => {
    setSelectedFood(null);
  };

  const handleAddToCart = () => {
    if (!selectedFood) return;
    
    addToCart({
      ...selectedFood,
      quantity,
    });
    
    // Close the modal after adding to cart
    handleCloseModal();
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Delicious Food Delivered To You
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Order your favorite meals from our extensive menu and enjoy a delicious lunch or dinner at home.
          </p>
        </div>
        
        {/* Food Listing */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <FoodListing 
            initialFoods={mockFoods}
            categories={mockCategories}
            onViewDetails={handleViewDetails}
          />
        </div>
        
        {/* Food Detail Modal */}
        <Modal
          isOpen={!!selectedFood}
          onClose={handleCloseModal}
          title={selectedFood?.name || ''}
          className="max-w-4xl"
        >
          {selectedFood && (
            <div className="p-6">
              <FoodDetail
                food={selectedFood}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
                onClose={handleCloseModal}
              />
            </div>
          )}
        </Modal>
      </main>
      </div>
  );
}
