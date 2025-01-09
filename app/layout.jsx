import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Default Title',
  description: 'This is a default description for the whole app.',
  keywords: 'nextjs, app, layout, metadata',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className="text-red-700">
        {children}
      </body>
    </html>
  );
}
