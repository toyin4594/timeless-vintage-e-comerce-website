import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function GuestCheckoutButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/guest-checkout')}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition-colors duration-200"
    >
      Continue as Guest
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}