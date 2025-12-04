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
    original_cost: "$7.99",
    discounted_cost: "$5.99",
  },
  {
    id: 2,
    name: "orange",
    imgUrl: "/images/4.webp",
    color: "orange",
    original_cost: "$7.99",
    discounted_cost: "$5.99",
  },
  {
    id: 3,
    name: "strawberry",
    imgUrl: "/images/5.webp",
    color: "red",
    original_cost: "$7.99",
    discounted_cost: "$5.99",
  },
  {
    id: 4,
    name: "all-taste",
    imgUrl: "/images/7.webp",
    color: "red+orange+lime",
    original_cost: "$23.99",
    discounted_cost: "$16.99",
  },
];

export { navLinks, NavImage, defaultImg, fruits, cans1 };
