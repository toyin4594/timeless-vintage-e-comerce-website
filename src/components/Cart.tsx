import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getProduct } from '../utils/products';
import toast from 'react-hot-toast';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, user } = useStore();
  const cartItems = cart.map(item => ({
    ...item,
    product: getProduct(item.productId)
  }));

  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.product?.price * item.quantity), 0
  );
  const shipping = 12.99;
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const product = getProduct(productId);
    const size = cart.find(item => item.productId === productId)?.size;
    if (!product || !size) return;

    const sizeInfo = product.sizes.find(s => s.name === size);
    if (!sizeInfo || quantity > sizeInfo.quantity) {
      toast.error('Requested quantity not available');
      return;
    }

    updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="mx-auto h-12 w-12 text-amber-300" />
        <h2 className="mt-4 text-lg font-medium text-amber-900">Your cart is empty</h2>
        <p className="mt-2 text-sm text-amber-600">
          Start adding some vintage treasures to your collection!
        </p>
        <Link to="/" className="vintage-button inline-block mt-8">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif text-amber-900 mb-8">Shopping Cart</h1>
      
      <div className="space-y-8">
        {cartItems.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex gap-6 py-6 border-b border-amber-200">
            <Link to={`/product/${item.productId}`}>
              <img
                src={item.product?.images[0]}
                alt={item.product?.name}
                className="h-24 w-24 object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&fit=crop';
                }}
              />
            </Link>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <Link 
                    to={`/product/${item.productId}`}
                    className="text-sm font-medium text-amber-900 hover:text-amber-700"
                  >
                    {item.product?.name}
                  </Link>
                  <p className="mt-1 text-sm text-amber-600">Size: {item.size}</p>
                </div>
                <p className="text-sm font-medium text-amber-900">
                  ${(item.product?.price * item.quantity).toFixed(2)}
                </p>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label htmlFor={`quantity-${item.productId}`} className="text-sm text-amber-600">
                    Qty:
                  </label>
                  <select
                    id={`quantity-${item.productId}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                    className="vintage-input py-1 px-2 text-sm"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    removeFromCart(item.productId);
                    toast.success('Item removed from cart');
                  }}
                  className="text-amber-600 hover:text-amber-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-amber-600">Subtotal</span>
          <span className="font-medium text-amber-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-amber-600">Shipping</span>
          <span className="font-medium text-amber-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-medium">
          <span className="text-amber-900">Total</span>
          <span className="text-amber-900">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleCheckout}
          className="vintage-button w-full flex items-center justify-center gap-2"
        >
          Proceed to Checkout
          <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/"
          className="block text-center mt-4 text-sm text-amber-600 hover:text-amber-800"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}