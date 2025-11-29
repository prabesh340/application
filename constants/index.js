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
	id: "work",
	title: "The Art",
    href:"#"
 },
 {
	id: "contact",
	title: "Contact",
    href:"#"
 },
]; 


const NavImage = [
	{url:'/can_res/can1.webp',key:'home',class:"img_home"},
	{url:'/can/can2.webp',key:'about',class:"img_about"},
	{url:'/can/can3.webp',key:'work',class:"img_work"},
	{url:'/can/can.webp',key:'contact',class:"img_contact"},
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