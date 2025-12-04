"use client";
import { ShoppingCart, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import React, { useRef, useEffect, use } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/navigation";

const Floatingcart = () => {
    const bgRef = useRef(null);
    const buttonRef = useRef(null);
    const contentRef = useRef(null);
    const timelineRef = useRef(null);
    const { cartItems, updateQuantity, removeFromCart, isCartOpen, toggleCart, getItemCount, getUniqueItemCount } = useCart();
    const router = useRouter();
    useGSAP(() => {
        timelineRef.current = gsap
            .timeline({ paused: true, reversed: true })
            .to(bgRef.current, {
                clipPath: 'circle(150% at calc(100% - 3.5rem) calc(100% - 3.5rem))',
                duration: 1,
                ease: "power2.inOut",
            })
            .from(contentRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.out",
            }, "-=0.3");
    }, []);

    useEffect(() => {
        if (timelineRef.current) {
            if (isCartOpen && timelineRef.current.reversed()) {
                timelineRef.current.play();
            } else if (!isCartOpen && !timelineRef.current.reversed()) {
                timelineRef.current.reverse();
            }
        }
    }, [isCartOpen]);

    const handleClick = () => {
        toggleCart();
    };

    const subtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.discounted_cost.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + tax + shipping;

    const itemCount = getItemCount();
    const uniqueItemCount = getUniqueItemCount();

    return (
        <div className="fixed bottom-8 right-8 z-39">
            <div
                ref={bgRef}
                className="fixed inset-0 bg-white pointer-events-none"
                style={{ clipPath: 'circle(0% at calc(100% - 3.5rem) calc(100% - 3.5rem))' }}
            >
                <div ref={contentRef} className="h-full overflow-y-auto pointer-events-auto pt-16 sm:pt-20">
                    <div className="w-full h-full flex flex-col">
                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center min-h-[60vh] lg:min-h-[80vh] py-12">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                            <ShoppingCart size={48} className="text-gray-400" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                        <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 text-center px-4">Add some products to get started</p>
                                        <button
                                            onClick={() => {
                                                handleClick();
                                                router.push('/products');
                                            }}
                                            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white cursor-pointer rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
                                        {/* Cart Items */}
                                        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                                            {cartItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="group relative bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all"
                                                >
                                                    <div className="flex gap-4 sm:gap-6">
                                                        {/* Product Image */}
                                                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                            <img 
                                                                src={item.imgUrl} 
                                                                alt={item.name} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        
                                                        {/* Product Details */}
                                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <div className="flex-1 min-w-0">
                                                                    <h3 className="font-semibold text-base sm:text-lg uppercase truncate">
                                                                        {item.name}
                                                                    </h3>
                                                                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.color}</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                            
                                                            {/* Price and Quantity */}
                                                            <div className="flex items-end justify-between mt-3 sm:mt-4">
                                                                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1.5">
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, -1)}
                                                                        className="p-1 hover:bg-white rounded transition-colors"
                                                                    >
                                                                        {item.quantity === 1 ? (
                                                                            <Trash2 size={16} className="text-red-500" />
                                                                        ) : (
                                                                            <Minus size={16} />
                                                                        )}
                                                                    </button>
                                                                    <span className="w-8 text-center text-sm font-semibold">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => updateQuantity(item.id, 1)}
                                                                        className="p-1 hover:bg-white rounded transition-colors"
                                                                    >
                                                                        <Plus size={16} />
                                                                    </button>
                                                                </div>
                                                                
                                                                <div className="text-right">
                                                                    <p className="text-lg sm:text-xl font-bold">
                                                                        ${(parseFloat(item.discounted_cost.replace('$', '')) * item.quantity).toFixed(2)}
                                                                    </p>
                                                                    {item.quantity > 1 && (
                                                                        <p className="text-xs text-gray-500">
                                                                            ${parseFloat(item.discounted_cost.replace('$', '')).toFixed(2)} each
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Summary */}
                                        <div className="lg:col-span-1">
                                            <div className="sticky top-32 bg-gray-50 rounded-2xl p-6 space-y-6 border border-gray-200">
                                                <h2 className="text-lg font-semibold">Order Summary</h2>
                                                
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Subtotal</span>
                                                        <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Tax (8%)</span>
                                                        <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Shipping</span>
                                                        <span className="font-medium">
                                                            {shipping === 0 ? (
                                                                <span className="text-green-600 font-semibold">FREE</span>
                                                            ) : (
                                                                <span className="text-gray-900">${shipping.toFixed(2)}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                {shipping > 0 && subtotal < 50 && (
                                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                        <p className="text-xs text-blue-800">
                                                            Add <span className="font-semibold">${(50 - subtotal).toFixed(2)}</span> more for free shipping!
                                                        </p>
                                                    </div>
                                                )}
                                                
                                                <div className="pt-4 border-t border-gray-300">
                                                    <div className="flex justify-between items-center mb-6">
                                                        <span className="text-lg font-semibold">Total</span>
                                                        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                                                    </div>
                                                    
                                                    <button
                                                        disabled={cartItems.length === 0}
                                                        className="w-full bg-black text-white py-3.5 rounded-full font-semibold hover:bg-gray-800 active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg"
                                                    >
                                                        <span>Checkout</span>
                                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                                
                                                <div className="pt-4 space-y-2 border-t border-gray-200">
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                        <span>Secure checkout</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                        </svg>
                                                        <span>Multiple payment options</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                        </svg>
                                                        <span>30-day free returns</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floating Cart Button */}
            <div className="relative">
                <div 
                    ref={buttonRef} 
                    className="p-4 cursor-pointer bg-white text-black rounded-full   transition-all" 
                    onClick={handleClick}
                >
                    <ShoppingCart size={24} />
                    {uniqueItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {uniqueItemCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Floatingcart;
