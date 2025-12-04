"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { cans1 } from "../../../constants";
import { Antonio } from "next/font/google";
import Link from "next/link";
import { useCart } from "../../../contexts/CartContext";

const antonio = Antonio({ subsets: ["latin"], weight: ["400", "700"] });

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart } = useCart();

  const product = cans1.find((can) => can.name === slug);
  
  // Dynamic color mapping based on product color
  const getColorClasses = (color) => {
    const colorMap = {
      lime: {
        bg: "bg-lime-50",
        text: "text-lime-900",
        textSecondary: "text-lime-800",
        textTertiary: "text-lime-700",
        textLight: "text-lime-600",
        border: "border-lime-200",
        borderLight: "border-lime-100",
        button: "bg-lime-300 hover:bg-lime-400",
        buttonOutline: "border-lime-200 hover:bg-lime-400",
      },

      orange: {
        bg: "bg-orange-50",
        text: "text-orange-900",
        textSecondary: "text-orange-800",
        textTertiary: "text-orange-700",
        textLight: "text-orange-600",
        border: "border-orange-200",
        borderLight: "border-orange-100",
        button: "bg-orange-300 hover:bg-orange-400",
        buttonOutline: "border-orange-200 hover:bg-orange-400",
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-900",
        textSecondary: "text-red-800",
        textTertiary: "text-red-700",
        textLight: "text-red-600",
        border: "border-red-200",
        borderLight: "border-red-100",
        button: "bg-red-300 hover:bg-red-400",
        buttonOutline: "border-red-200 hover:bg-red-400",
      },
      "red+orange+lime": {
        bg: "bg-white",
        text: "text-black",
        textSecondary: "text-gray-800",
        textTertiary: "text-gray-700",
        textLight: "text-gray-600",
        border: "border-gray-300",
        borderLight: "border-gray-200",
        button: "bg-black hover:bg-gray-800",
        buttonOutline: "border-gray-300 hover:bg-gray-400",
      },
    };

    // Get color name from product color string (e.g., "Lime Green" -> "lime")
    const colorKey = color?.toLowerCase().split(" ")[0] || "lime";
    return colorMap[colorKey] || colorMap["lime"];
  };

  const colors = product
    ? getColorClasses(product.color)
    : getColorClasses("lime");

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      openCart();
    }
  };

  if (!product) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${antonio.className}`}
      >
        <h1 className="text-2xl text-gray-600">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className={`min-h-screen  ${antonio.className} bg-[#dff3e3]`}  >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 ">
        {/* Left: Image section */}
        <div className="relative h-[55vh] lg:h-screen ">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover "
          />
        </div>

        {/* Right: Content */}
        <div
          className={`${colors.bg} px-8 lg:px-20 py-12 lg:py-20 flex flex-col space-y-8`}
        >
          {/* Back button - AT THE TOP */}
          <button
            onClick={() => {
              console.log("Back button clicked!");
              window.history.back();
            }}
            className={`self-start px-6 py-3 border-2 ${colors.border} bg-white text-base font-bold ${colors.text} ${colors.buttonOutline} hover:text-white uppercase tracking-wider flex items-center gap-2 group cursor-pointer z-10 transition-colors`}
            type="button"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Product name */}
          <div className="space-y-4">
            <h1
              className={`text-7xl lg:text-8xl font-bold uppercase ${colors.text} leading-none`}
            >
              {product.name}
            </h1>
            <p className={`text-2xl ${colors.textSecondary}`}>
              {product.color}
            </p>
          </div>

          {/* Quick specs */}
          <div className="flex gap-8 text-sm">
            <div>
              <p className={`${colors.textTertiary} mb-1`}>Size</p>
              <p className={`font-bold ${colors.text}`}>355ml</p>
            </div>
            <div>
              <p className={`${colors.textTertiary} mb-1`}>Caffeine</p>
              <p className={`font-bold ${colors.text}`}>180mg</p>
            </div>
            <div>
              <p className={`${colors.textTertiary} mb-1`}>Sugar</p>
              <p className={`font-bold ${colors.text}`}>0g</p>
            </div>
          </div>

          {/* Price */}
          <div
            className={`flex items-baseline gap-4 pb-8 border-b ${colors.borderLight}`}
          >
            <span className={`text-6xl font-bold ${colors.text}`}>
              {product.discounted_cost}
            </span>
            <span className={`text-2xl ${colors.textLight} line-through`}>
              {product.original_cost}
            </span>
          </div>

          {/* Quantity */}
          <div className="space-y-4">
            <label
              className={`block text-sm font-bold ${colors.text} uppercase`}
            >
              Quantity
            </label>
            <div className="flex items-center gap-3 w-fit">
              <button
                onClick={handleDecrease}
                className={`w-12 h-12 border-2 ${colors.border} ${colors.text} flex items-center justify-center text-xl font-bold ${colors.buttonOutline} hover:text-white disabled:opacity-20 transition-colors`}
                disabled={quantity === 1}
              >
                −
              </button>
              <div
                className={`w-16 h-12 border-2 ${colors.border} flex items-center justify-center`}
              >
                <span className={`text-xl font-bold ${colors.text}`}>
                  {quantity}
                </span>
              </div>
              <button
                onClick={handleIncrease}
                className={`w-12 h-12 border-2 ${colors.border} ${colors.text} flex items-center justify-center text-xl font-bold ${colors.buttonOutline} hover:text-white disabled:opacity-20 transition-colors`}
                disabled={quantity === 10}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full ${colors.button} text-white h-16 text-base font-bold uppercase tracking-wider transition-colors`}
          >
            Add to Cart — $
            {(parseFloat(product.discounted_cost.slice(1)) * quantity).toFixed(
              2
            )}
          </button>

          {/* Get All Flavors button - only show if not already on all-taste product */}
          {product.name !== "all-taste" && (
            <Link
              href="/products/all-taste"
              className={`w-full border-2 ${colors.border} ${colors.text} h-16 text-base font-bold uppercase flex justify-center items-center tracking-wider ${colors.buttonOutline} hover:text-white transition-colors`}
            >
              Get All Flavors
            </Link>
          )}

          {/* Info */}
          <div className={`flex gap-6 text-sm ${colors.textSecondary} pt-4`}>
            <p>Free shipping over $50</p>
            <p>•</p>
            <p>Same day delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
