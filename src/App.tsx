import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import CategoryFilter from './components/CategoryFilter';
import Cart from './components/Cart';
import Login from './components/Auth/Login';
import CheckoutForm from './components/Checkout/CheckoutForm';
import GuestCheckout from './components/Checkout/GuestCheckout';
import StripeWrapper from './components/Checkout/StripeWrapper';
import OrderConfirmation from './components/Checkout/OrderConfirmation';

function HomePage() {
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif italic text-amber-900 mb-4">
          Timeless Elegance, Modern Style
        </h1>
        <p className="text-amber-700 max-w-2xl mx-auto">
          Discover carefully curated vintage pieces that tell stories of decades past,
          reimagined for the modern wardrobe.
        </p>
      </div>

      <CategoryFilter />
      <ProductGrid />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/guest-checkout" element={<GuestCheckout />} />
            <Route path="/payment" element={<StripeWrapper />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}