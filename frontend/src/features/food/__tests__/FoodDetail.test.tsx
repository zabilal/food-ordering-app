import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FoodDetail from '../FoodDetail';
import { FoodItem } from '@/types/food';

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

describe('FoodDetail', () => {
  const mockOnQuantityChange = jest.fn();
  const mockOnAddToCart = jest.fn();
  
  beforeEach(() => {
    mockOnQuantityChange.mockClear();
    mockOnAddToCart.mockClear();
  });

  it('renders food details correctly', () => {
    render(
      <FoodDetail 
        food={mockFood} 
        quantity={1}
        onQuantityChange={mockOnQuantityChange}
        onAddToCart={mockOnAddToCart} 
      />
    );

    // Check if the food name is rendered
    expect(screen.getByText('Margherita Pizza')).toBeInTheDocument();
    
    // Check if the price is present (format might vary based on implementation)
    expect(screen.getByText(/12.99/)).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText('Classic pizza with tomato sauce, mozzarella, and fresh basil')).toBeInTheDocument();
    
    // Check if the rating is displayed
    expect(screen.getByText('4.8')).toBeInTheDocument();
    
    // Check if the prep time is displayed
    expect(screen.getByText('20 min')).toBeInTheDocument();
    
    // Check if the veg badge is shown
    expect(screen.getByText('Veg')).toBeInTheDocument();
    
    // Check if the quantity selector is present
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    
    // Check if the Add to Cart button is present
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('calls onAddToCart when Add to Cart is clicked', () => {
    render(
      <FoodDetail 
        food={mockFood} 
        quantity={1}
        onQuantityChange={mockOnQuantityChange}
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    // Click Add to Cart button
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    
    // Check if onAddToCart was called
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });

  it('calls onQuantityChange when quantity is updated', () => {
    render(
      <FoodDetail 
        food={mockFood} 
        quantity={1}
        onQuantityChange={mockOnQuantityChange}
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    // Find and click the increment button
    const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
    fireEvent.click(incrementButton);
    
    // Check if onQuantityChange was called with the new quantity
    expect(mockOnQuantityChange).toHaveBeenCalledTimes(1);
    expect(mockOnQuantityChange).toHaveBeenCalledWith(2);
  });

  it('displays the correct quantity', () => {
    render(
      <FoodDetail 
        food={mockFood} 
        quantity={3}
        onQuantityChange={mockOnQuantityChange}
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    // Check if the quantity is displayed correctly
    const quantityInput = screen.getByLabelText('Quantity') as HTMLInputElement;
    expect(quantityInput.value).toBe('3');
  });

  it('does not allow quantity to go below 1', () => {
    render(
      <FoodDetail 
        food={mockFood} 
        quantity={1}
        onQuantityChange={mockOnQuantityChange}
        onAddToCart={mockOnAddToCart} 
      />
    );
    
    // Find and click the decrement button
    const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
    fireEvent.click(decrementButton);
    
    // Check that the quantity doesn't go below 1
    expect(mockOnQuantityChange).toHaveBeenCalledTimes(1);
    expect(mockOnQuantityChange).toHaveBeenCalledWith(1);
  });
});
