import "./globals.css";
import Navbar from "@/components/Navbar.jsx";
import SessionWrapper from "@/components/SessionWrapper.jsx";

export const metadata = {
  title: "Motor24",
  description: "Best Website for Motor Sales",
  keywords: "car, bike, sale, price",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          <main className="container mx-auto p-4 pt-[5rem]">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
