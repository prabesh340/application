const navLinks = [
 {
	id: "home",
	title: "home",
	href:"/"
 },
 {
	id: "about",
	title: "About Us",
	href:"#"

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
	{url:'can1.webp',key:'home',class:"img_home"},
	{url:'can.webp',key:'about',class:"img_about"},
	{url:'can1.webp',key:'work',class:"img_work"},
	{url:'can1.webp',key:'contact',class:"img_contact"},
]

const defaultImg = "group.webp";





export{
    navLinks,
	NavImage,
	defaultImg
}