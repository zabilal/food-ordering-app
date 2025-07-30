'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(itemId, quantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-4 sm:p-6">
                    <div className="flex items-start sm:items-center">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="ml-4 text-lg font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item.id}`} className="sr-only">
                              Quantity
                            </label>
                            <select
                              id={`quantity-${item.id}`}
                              name={`quantity-${item.id}`}
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="max-w-full rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-sm font-medium text-primary hover:text-opacity-80"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">$0.00</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Proceed to Checkout
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  or{' '}
                  <Link href="/" className="font-medium text-primary hover:text-opacity-80">
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
