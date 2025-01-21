import '@/assets/styles/globals.css';
// import '@/components/Navbar.jsx'
import Navbar from '@/components/Navbar';'@/components/Navbar'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // <-- Import the Bootstrap JS bundle




export const metadata = {
  title: "Motor24",
  description: "Best Website for Motor Sales",
  keywords: 'car, bike, sale, price',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
