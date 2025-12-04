const navLinks = [
  {
    id: "shop",
    title: "Shop",
    href: "/products",
  },
  {
    id: "about",
    title: "About Us",
    href: "/about",
  },
  {
    id: "gallery",
    title: "Gallery",
    href: "/gallery",
  },
  {
    id: "contact",
    title: "Contact",
    href: "/contact",
  },
];

const NavImage = [
  { url: "/can/can.webp", key: "shop", class: "img_shop" },
  { url: "/images/7.webp", key: "about", class: "img_about" },
  { url: "/images/1.webp", key: "gallery", class: "img_gallery" },
  { url: "/images/5.webp", key: "contact", class: "img_contact" },
];

const defaultImg = "/can_res/group.webp";
export const cans = [
  {
    id: 1,
    name: "lime",
    imgUrl: "/can/can.webp",
    color: "lime",
  },
  {
    id: 2,
    name: "orange",
    imgUrl: "/can/can2.webp",
    color: "orange",
  },
  {
    id: 3,
    name: "strawberry",
    imgUrl: "/can/can3.webp",
    color: "red",
  },
 
];
const fruits = ["lime", "orange", "strawberry"];

export const cans1 = [
  {
    id: 1,
    name: "lime",
    imgUrl: "/images/6.webp",
    color: "lime",
    original_cost: "Rs 500",
    discounted_cost: "Rs 250",
    maxQuantity: 10,
  },
  {
    id: 2,
    name: "orange",
    imgUrl: "/images/4.webp",
    color: "orange",
    original_cost: "Rs 500",
    discounted_cost: "Rs 250",
    maxQuantity: 2,
  },
  {
    id: 3,
    name: "strawberry",
    imgUrl: "/images/5.webp",
    color: "red",
    original_cost: "Rs 500",
    discounted_cost: "Rs 250",
    maxQuantity: 10,
  },
  {
    id: 4,
    name: "all-taste",
    imgUrl: "/images/7.webp",
    color: "red+orange+lime",
    original_cost: "Rs 1000",
    discounted_cost: "Rs 1500",
    maxQuantity: 10,
  },
   {
    id: 4,
    name: "all-tase",
    imgUrl: "/images/7.webp",
    color: "red+orange+lime",
    original_cost: "Rs 1000",
    discounted_cost: "Rs 1500",
    maxQuantity: 10,
  },
];

// Shipping and Tax Configuration
export const shippingConfig = {
  freeShippingThreshold: 500, // Free shipping above Rs 5000
  shippingCost: 80, // Shipping cost Rs 100
  taxRate: 0.13, // 13% tax rate
};

export { navLinks, NavImage, defaultImg, fruits, cans1 };
