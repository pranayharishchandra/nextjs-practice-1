import '@/assets/styles/globals.css';
// import '@/components/Navbar.jsx'
import Navbar from '@/components/Navbar';'@/components/Navbar'

// export const metadata = {
//   title: 'Default Title',
//   description: 'This is a default description for the whole app.',
//   keywords: 'nextjs, app, layout, metadata',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">

//       <body className="text-red-700">
//         {children}
//       </body>
//     </html>
//   );
// }

///---
export const metadata = {
  title: "PranayNext",
  description: "A Next.js application",
  keywords: 'nextjs, app, layout, metadata',
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
