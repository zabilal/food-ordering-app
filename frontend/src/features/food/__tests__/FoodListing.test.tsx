import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodListing from '../FoodListing';
import { FoodItem, FoodCategory } from '@/types/food';
import { CartProvider } from '@/context/CartContext';

// Mock data
const mockCategories: FoodCategory[] = [
  { id: '1', name: 'Pizza' },
  { id: '2', name: 'Burgers' },
  { id: '3', name: 'Sushi' },
];

const mockFoods: FoodItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce and mozzarella',
    price: 12.99,
    image: 'pizza.jpg',
    category: 'pizza',
    rating: 4.8,
    prepTime: 20,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
  },
  {
    id: '2',
    name: 'Cheeseburger',
    description: 'Juicy beef patty with cheese and veggies',
    price: 9.99,
    image: 'burger.jpg',
    category: 'burger',
    rating: 4.5,
    prepTime: 15,
    isVeg: false,
    isSpicy: true,
    isPopular: false,
  },
  {
    id: '3',
    name: 'California Roll',
    description: 'Delicious sushi roll with crab and avocado',
    price: 14.99,
    image: 'sushi.jpg',
    category: 'sushi',
    rating: 4.7,
    prepTime: 25,
    isVeg: false,
    isSpicy: false,
    isPopular: true,
  },
];

describe('FoodListing', () => {
  const mockOnViewDetails = jest.fn();
  
  beforeEach(() => {
    mockOnViewDetails.mockClear();
  });

  it('renders all food items by default', () => {
    render(
      <CartProvider>
        <FoodListing 
          foods={mockFoods} 
          categories={mockCategories} 
          onViewDetails={mockOnViewDetails} 
        />
      </CartProvider>
    );
    
    // Check if all food items are rendered
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('Cheeseburger')).toBeInTheDocument();
    expect(screen.getByText('California Roll')).toBeInTheDocument();
    
    // Check if the search input is present
    expect(screen.getByPlaceholderText('Search for food...')).toBeInTheDocument();
    
    // Check if category filters are rendered
    expect(screen.getByText('All')).toBeInTheDocument();
    mockCategories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('filters food items by search query', () => {
    render(
      <CartProvider>
        <FoodListing 
          foods={mockFoods} 
          categories={mockCategories} 
          onViewDetails={mockOnViewDetails} 
        />
      </CartProvider>
    );
    
    // Type in the search input
    const searchInput = screen.getByPlaceholderText('Search for food...');
    fireEvent.change(searchInput, { target: { value: 'pizza' } });
    
    // Only the pizza item should be visible
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.queryByText('Cheeseburger')).not.toBeInTheDocument();
    expect(screen.queryByText('California Roll')).not.toBeInTheDocument();
  });

  it('filters food items by category', () => {
    render(
      <CartProvider>
        <FoodListing 
          foods={mockFoods} 
          categories={mockCategories} 
          onViewDetails={mockOnViewDetails} 
        />
      </CartProvider>
    );
    
    // Click on the 'Burgers' category
    fireEvent.click(screen.getByText('Burgers'));
    
    // Only the burger item should be visible
    expect(screen.queryByText('Margherita Pizza')).not.toBeInTheDocument();
    expect(screen.getByText('Cheeseburger')).toBeInTheDocument();
    expect(screen.queryByText('California Roll')).not.toBeInTheDocument();
    
    // The 'Burgers' category button should be active
    expect(screen.getByText('Burgers').closest('button')).toHaveClass('bg-primary');
  });

  it('calls onViewDetails when a food card is clicked', () => {
    render(
      <CartProvider>
        <FoodListing 
          foods={mockFoods} 
          categories={mockCategories} 
          onViewDetails={mockOnViewDetails} 
        />
      </CartProvider>
    );
    
    // Click on the first food card
    fireEvent.click(screen.getByText('Margherita Pizza').closest('.card')!);
    
    // Check if onViewDetails was called with the correct food item
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockFoods[0]);
  });

  it('displays a message when no food items match the search', () => {
    render(
      <CartProvider>
        <FoodListing 
          foods={mockFoods} 
          categories={mockCategories} 
          onViewDetails={mockOnViewDetails} 
        />
      </CartProvider>
    );
    
    // Type a search query that doesn't match any food
    const searchInput = screen.getByPlaceholderText('Search for food...');
    fireEvent.change(searchInput, { target: { value: 'pasta' } });
    
    // Check if the "no results" message is displayed
    expect(screen.getByText('No food items found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filter to find what you\'re looking for.')).toBeInTheDocument();
  });

  it('displays a message when there are no food items', () => {
    render(
      <CartProvider>
        <FoodListing 
          foods={[]} 
          categories={mockCategories} 
          onViewDetails={mockOnViewDetails} 
        />
      </CartProvider>
    );
    
    // Check if the empty state message is displayed
    expect(screen.getByText('No food items available')).toBeInTheDocument();
    expect(screen.getByText('Check back later for our delicious menu items.')).toBeInTheDocument();
  });

  it('resets filters when clicking the "All" category', () => {
    render(
      <CartProvider>
        <FoodListing 
          foods={mockFoods} 
          categories={mockCategories} 
          onViewDetails={mockOnViewDetails} 
        />
      </CartProvider>
    );
    
    // First, filter by a category
    fireEvent.click(screen.getByText('Burgers'));
    
    // Then click 'All' to reset filters
    fireEvent.click(screen.getByText('All'));
    
    // All food items should be visible again
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    expect(screen.getByText('Cheeseburger')).toBeInTheDocument();
    expect(screen.getByText('California Roll')).toBeInTheDocument();
    
    // The 'All' button should be active
    expect(screen.getByText('All').closest('button')).toHaveClass('bg-primary');
  });
});
