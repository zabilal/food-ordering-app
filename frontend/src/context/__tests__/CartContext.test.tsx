import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart } from '../CartContext';
import { FoodItem } from '@/types/food';

// Mock food items for testing
const mockFood1: FoodItem = {
  id: '1',
  name: 'Margherita Pizza',
  description: 'Classic pizza',
  price: 12.99,
  image: 'pizza.jpg',
  category: 'pizza',
  rating: 4.8,
  prepTime: 20,
  isVeg: true,
  isSpicy: false,
  isPopular: true,
};

const mockFood2: FoodItem = {
  id: '2',
  name: 'Pepperoni Pizza',
  description: 'Spicy pepperoni pizza',
  price: 14.99,
  image: 'pepperoni.jpg',
  category: 'pizza',
  rating: 4.5,
  prepTime: 25,
  isVeg: false,
  isSpicy: true,
  isPopular: true,
};

describe('CartContext', () => {
  it('should add an item to the cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Initial cart should be empty
    expect(result.current.items).toHaveLength(0);

    // Add an item to cart
    act(() => {
      result.current.addToCart(mockFood1);
    });

    // Cart should now have 1 item with quantity 1
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('1');
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(12.99);
  });

  it('should increment quantity when adding the same item multiple times', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Add the same item twice
    act(() => {
      result.current.addToCart(mockFood1);
      result.current.addToCart(mockFood1);
    });

    // Should have 1 item with quantity 2
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(25.98); // 12.99 * 2
  });

  it('should remove an item from the cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Add two items
    act(() => {
      result.current.addToCart(mockFood1);
      result.current.addToCart(mockFood2);
    });

    // Should have 2 items
    expect(result.current.items).toHaveLength(2);

    // Remove the first item
    act(() => {
      result.current.removeFromCart('1');
    });

    // Should have 1 item left
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(14.99);
  });

  it('should update item quantity', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Add an item
    act(() => {
      result.current.addToCart(mockFood1);
    });

    // Update quantity to 3
    act(() => {
      result.current.updateQuantity('1', 3);
    });

    // Should update quantity and totals
    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBe(38.97); // 12.99 * 3
  });

  it('should clear the cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Add some items
    act(() => {
      result.current.addToCart(mockFood1);
      result.current.addToCart(mockFood2);
    });

    // Should have items
    expect(result.current.items.length).toBeGreaterThan(0);

    // Clear cart
    act(() => {
      result.current.clearCart();
    });

    // Cart should be empty
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('should throw an error when used outside of CartProvider', () => {
    // Suppress console error for this test
    const originalError = console.error;
    console.error = jest.fn();

    // This should throw because there's no CartProvider
    const { result } = renderHook(() => useCart());

    expect(result.error).toBeDefined();
    expect((result.error as Error).message).toContain('useCart must be used within a CartProvider');

    // Restore console.error
    console.error = originalError;
  });
});
