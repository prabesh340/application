"use client"
import React from 'react';
import Link from 'next/link';
import { cans1 } from '../../constants';
import { Antonio } from "next/font/google";
import { useCart } from '../../contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';

const antonio = Antonio({ subsets: ["latin"], weight: ["400", "700"] });

const ProductsPage = () => {
  const { addToCart, openCart, cartItems } = useCart();

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    const maxQty = product.maxQuantity || 10;
    
    if (existingItem && existingItem.quantity >= maxQty) {
      toast.error(`Maximum ${maxQty} items allowed for ${product.name}`, {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#ef4444',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      return;
    }
    
    addToCart(product, 1);
    openCart();
  };

  return (
    <div className={`min-h-screen bg-white ${antonio.className}`}>
      <Toaster />
      {/* Hero Section */}
      <div className="bg-[#222123] text-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-7xl lg:text-9xl font-bold uppercase mb-4">
            All Flavors
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400">
            Discover our complete collection of energy drinks
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cans1.map((product) => (
            <Link 
              key={product.name} 
              href={`/products/${product.name}`}
              className="group"
            >
              <div className="bg-zinc-900 aspect-square relative overflow-hidden">
                <img 
                  src={product.imgUrl} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="mt-6 space-y-3">
                <h2 className="text-3xl font-bold uppercase text-black group-hover:text-gray-600 transition-colors">
                  {product.name}
                </h2>
                <p className="text-lg text-gray-600">
                  {product.color}
                </p>
                
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-bold text-black">
                    {product.discounted_cost}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {product.original_cost}
                  </span>
                </div>
                
                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="mt-4 w-full bg-black text-white py-3 px-6 font-medium uppercase text-sm hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Quick Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default ProductsPage;