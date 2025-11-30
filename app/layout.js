import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Loader from "./components/loader/Loader";
import { SmoothScrollProvider } from "./components/ScrollsmoothProdiver";
import Fottor from "./components/Fottor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lexi- Drink your way",
  description: "Lexi — a refreshing beverage experience crafted to energize your moments. Explore bold flavors, smooth blends, and a lifestyle built around taste, creativity, and enjoyment. Drink your way with Lexi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        
        <SmoothScrollProvider />

        <Loader />
        <Header />
        {children}
        <Fottor/>
      </body>
    </html>
  );
}
