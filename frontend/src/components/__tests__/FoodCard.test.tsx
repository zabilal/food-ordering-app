import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodCard from '../FoodCard';
import { FoodItem } from '@/types/food';

describe('FoodCard', () => {
  const mockFood: FoodItem = {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    image: 'https://example.com/pizza.jpg',
    category: 'pizza',
    rating: 4.8,
    prepTime: 20,
    isVeg: true,
    isSpicy: false,
    isPopular: true,
  };

  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    mockOnViewDetails.mockClear();
  });

  it('renders food item details correctly', () => {
    render(<FoodCard food={mockFood} onViewDetails={mockOnViewDetails} />);
    
    // Check if the food name is rendered
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    
    // Check if the price is formatted correctly
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('Classic pizza with tomato sauce, mozzarella, and fresh basil')).toBeInTheDocument();
    
    // Check if the rating is displayed
    expect(screen.getByText('4.8')).toBeInTheDocument();
    
    // Check if the veg badge is shown
    expect(screen.getByText('Veg')).toBeInTheDocument();
    
    // Check if the popular tag is shown
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('calls onViewDetails when clicked', () => {
    render(<FoodCard food={mockFood} onViewDetails={mockOnViewDetails} />);
    
    // Click on the card
    fireEvent.click(screen.getByText('Margherita Pizza').closest('.card')!);
    
    // Check if onViewDetails was called with the correct food item
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
    expect(mockOnViewDetails).toHaveBeenCalledWith(mockFood);
  });

  it('shows spicy badge for spicy food', () => {
    const spicyFood = { ...mockFood, isSpicy: true };
    render(<FoodCard food={spicyFood} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.getByText('Spicy')).toBeInTheDocument();
  });

  it('does not show popular tag when food is not popular', () => {
    const notPopularFood = { ...mockFood, isPopular: false };
    render(<FoodCard food={notPopularFood} onViewDetails={mockOnViewDetails} />);
    
    expect(screen.queryByText('Popular')).not.toBeInTheDocument();
  });
});
