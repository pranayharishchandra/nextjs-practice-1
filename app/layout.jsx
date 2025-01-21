import '@/assets/styles/globals.css';
// import '@/components/Navbar.jsx'
import Navbar from '@/components/Navbar';

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
