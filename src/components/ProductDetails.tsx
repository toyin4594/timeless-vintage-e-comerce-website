import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product, Size } from '../types';

// This would normally come from an API
const getProduct = (id: string): Product => ({
  id,
  name: '1960s Floral Mini Dress',
  description: 'Authentic vintage dress from the 1960s featuring a vibrant floral pattern. This piece exemplifies the mod style of the era with its distinctive cut and playful print.',
  price: 189.99,
  images: [
    'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80',
  ],
  category: 'Dresses',
  era: '60s',
  condition: 'Excellent',
  sizes: [
    { name: 'S', available: true, quantity: 1 },
    { name: 'M', available: true, quantity: 2 },
    { name: 'L', available: false, quantity: 0 },
  ],
  measurements: {
    bust: '34"',
    waist: '26"',
    hips: '36"',
    length: '36"',
  },
  provenance: 'Sourced from a private collection in Paris',
});

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || '1');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      productId: product.id,
      quantity: 1,
      size: selectedSize,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} view ${index + 1}`}
              className="w-full rounded-lg"
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="border-b border-amber-200 pb-6">
            <h1 className="text-3xl font-serif text-amber-900 mb-2">{product.name}</h1>
            <p className="text-2xl text-amber-800">${product.price}</p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            
            <div className="space-y-2">
              <h3 className="font-medium text-amber-900">Condition</h3>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                product.condition === 'Excellent'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {product.condition}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-amber-900">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size: Size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    disabled={!size.available}
                    className={`px-4 py-2 rounded-md text-sm font-medium
                      ${size.available 
                        ? selectedSize === size.name
                          ? 'bg-amber-800 text-white'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-amber-900">Measurements</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.measurements).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-gray-600 capitalize">{key}:</span>{' '}
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {product.provenance && (
              <div className="space-y-2">
                <h3 className="font-medium text-amber-900">Provenance</h3>
                <p className="text-sm text-gray-600">{product.provenance}</p>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="vintage-button flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3 rounded-md border border-amber-200 hover:bg-amber-50"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-amber-800'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}