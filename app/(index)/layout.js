import { Antonio } from "next/font/google";

export const antonio = Antonio({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});
export default function Layout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}