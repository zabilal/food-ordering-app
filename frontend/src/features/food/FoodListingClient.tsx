'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// Using inline SVGs instead of lucide-react to avoid dependency issues
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Loader2Icon = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
import { FoodCard } from '@/components/ui/cards/FoodCard';
import { FoodDetailModal } from './FoodDetailModal';
import { SearchInput } from '@/components/ui/forms/SearchInput';
import { CategorySelector } from '@/components/ui/forms/CategorySelector';
import { Button } from '@/components/ui/buttons/Button';
import { FoodItem, FoodCategory } from '@/types/food';
import { useCart } from '@/context/CartContext';
import { searchFoods, getFoodsByCategory } from '@/lib/api/foods';
import { cn } from '@/lib/utils';

interface FoodListingClientProps {
  initialFoods: FoodItem[];
  categories: Array<FoodCategory & { icon?: React.ReactNode }>;
  onViewDetails: (food: FoodItem) => void;
}

// Debounce search to avoid too many API calls
const DEBOUNCE_DELAY = 300;

export default function FoodListingClient({ 
  initialFoods, 
  categories, 
  onViewDetails 
}: FoodListingClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  
  // State
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [quantity, setQuantity] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Filter foods based on search query and selected category
  const filteredFoods = useMemo(() => {
    return foods.filter(food => {
      const matchesSearch = searchQuery === '' || 
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        food.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [foods, searchQuery, selectedCategory]);

  // Handle search with debouncing
  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (searchQuery.trim() === '') {
        setFoods(initialFoods);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchFoods(searchQuery);
        setFoods(results);
      } catch (error) {
        console.error('Error searching foods:', error);
      } finally {
        setIsSearching(false);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timerId);
  }, [searchQuery, initialFoods]);

  // Handle category filter with search integration
  const handleCategoryChange = useCallback(async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsLoading(true);
    
    try {
      let results: FoodItem[] = [];
      
      if (categoryId === 'all') {
        if (searchQuery.trim()) {
          results = await searchFoods(searchQuery);
        } else {
          results = initialFoods;
        }
      } else {
        results = await getFoodsByCategory(categoryId);
        if (searchQuery.trim()) {
          // Apply search filter to category results
          results = results.filter(
            (food) =>
              food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              food.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      }
      
      setFoods(results);
    } catch (error) {
      console.error('Error filtering by category:', error);
      // Fallback to client-side filtering if API fails
      setFoods(
        initialFoods.filter((food) => {
          const matchesCategory = categoryId === 'all' || food.category === categoryId;
          if (!searchQuery.trim()) return matchesCategory;
          
          const matchesSearch =
            food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            food.description.toLowerCase().includes(searchQuery.toLowerCase());
            
          return matchesCategory && matchesSearch;
        })
      );
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, initialFoods]);
  
  // Handle adding item to cart
  const handleAddToCart = useCallback((food: FoodItem) => {
    addToCart({ ...food, quantity: 1 });
    // In a real app, you might want to show a toast notification here
  }, [addToCart]);
  
  // Handle toggling favorite status
  const handleToggleFavorite = useCallback((food: FoodItem) => {
    // In a real app, you would update the favorite status in the backend
    console.log('Toggling favorite status for:', food.id);
  }, []);

  const handleViewDetails = (food: FoodItem) => {
    setSelectedFood(food);
    setIsModalOpen(true);
    onViewDetails(food);
  };

  const handleModalAddToCart = () => {
    if (selectedFood) {
      addToCart({ ...selectedFood, quantity });
      setIsModalOpen(false);
      setQuantity(1);
      // In a real app, you might want to show a toast notification here
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      let results: FoodItem[] = [];
      
      if (query.trim()) {
        // Search API call
        results = await searchFoods(query);
      } else if (selectedCategory === 'all') {
        // Reset to initial foods if no query and all categories selected
        results = initialFoods;
      } else {
        // Filter by category if no search query
        results = await getFoodsByCategory(selectedCategory);
      }
      
      setFoods(results);
    } catch (error) {
      console.error('Error searching foods:', error);
      // Fallback to client-side filtering if API fails
      if (!query.trim()) {
        setFoods(
          selectedCategory === 'all'
            ? initialFoods
            : initialFoods.filter((food) => food.category === selectedCategory)
        );
      } else {
        setFoods(
          initialFoods.filter(
            (food) =>
              food.name.toLowerCase().includes(query.toLowerCase()) ||
              food.description.toLowerCase().includes(query.toLowerCase())
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, initialFoods]);

  return (
    <section id="food-menu" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 md:mb-0">Our Menu</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for food..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <h3 className="sr-only">Food Categories</h3>
          <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-pressed={selectedCategory === 'all'}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={selectedCategory === category.id}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Food Grid */}
        {isLoading || isSearching ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No dishes found</h3>
            <p className="text-gray-500">We couldn&apos;t find any food items matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onFavoriteToggle={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                onClick={() => handleViewDetails(food)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          food={selectedFood}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleModalAddToCart}
          isAddingToCart={false}
        />
      )}
    </section>
  );
}
