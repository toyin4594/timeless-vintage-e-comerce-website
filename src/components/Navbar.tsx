import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User2, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);

  return (
    <nav className="bg-amber-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif italic text-amber-900">Vintage Threads</h1>
          </Link>

          <div className="hidden sm:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-amber-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-amber-200 rounded-md leading-5 bg-white placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Search vintage treasures..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="relative text-amber-900 hover:text-amber-700">
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-amber-900 hover:text-amber-700">
              <ShoppingBag className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-amber-900 hover:text-amber-700">
              <User2 className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}