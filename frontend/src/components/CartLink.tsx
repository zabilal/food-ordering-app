'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartLink() {
  const { totalItems } = useCart();
  
  return (
    <Link 
      href="/cart" 
      className="relative inline-flex items-center p-2 -m-2 text-gray-700 hover:text-primary"
    >
      <ShoppingCartIcon className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
          {totalItems}
        </span>
      )}
      <span className="sr-only">Cart, {totalItems} items</span>
    </Link>
  );
}
