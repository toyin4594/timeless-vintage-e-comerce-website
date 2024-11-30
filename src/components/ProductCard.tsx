import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    const defaultSize = product.sizes.find(size => size.available && size.quantity > 0);
    if (defaultSize) {
      addToCart({
        productId: product.id,
        quantity: 1,
        size: defaultSize.name
      });
      toast.success('Added to cart!');
    } else {
      toast.error('Product is out of stock');
    }
  };

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&fit=crop';
            }}
          />
        </div>
      </Link>

      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={() => toggleWishlist(product.id)}
          className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-200"
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`p-2 rounded-full shadow-sm transition-all duration-200 ${
            product.inStock 
              ? 'bg-amber-500/90 hover:bg-amber-500 text-white'
              : 'bg-gray-200 cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Era: {product.era}</p>
          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
            product.condition === 'Excellent'
              ? 'bg-green-100 text-green-700'
              : product.condition === 'Very Good'
              ? 'bg-blue-100 text-blue-700'
              : product.condition === 'Good'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {product.condition}
          </span>
        </div>
        {!product.inStock && (
          <p className="text-sm text-red-500">Out of Stock</p>
        )}
      </div>
    </div>
  );
}