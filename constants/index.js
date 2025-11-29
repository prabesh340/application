const navLinks = [
 {
	id: "home",
	title: "home",
	href:"/"
 },
 {
	id: "about",
	title: "About Us",
	href:"/about"

 },
 {
	id: "gallery",
	title: "Gallery",
    href:"/gallery"
 },
 {
	id: "contact",
	title: "Contact",
    href:"/contact"
 },
]; 


const NavImage = [
	{url:'/can/can.webp',key:'home',class:"img_home"},
	{url:'/images/7.webp',key:'about',class:"img_about"},
	{url:'/images/1.webp',key:'gallery',class:"img_gallery"},
	{url:'/images/5.webp',key:'contact',class:"img_contact"},
]

const defaultImg = "/can_res/group.webp";
export const cans = [
  {
    id: 1,
    name: "lime",
    imgUrl: "/can/can.webp",
    color:"lime"
  },
  {
    id: 2,
    name: "orange",
    imgUrl: "/can/can2.webp",
    color:"orange"
  },
  {
    id: 3,
    name: "strawberry",
    imgUrl: "/can/can3.webp",
    color:"red"
  }
];
const fruits = ["lime", "orange", "strawberry"];




export{
    navLinks,
	NavImage,
	defaultImg,
  fruits
}