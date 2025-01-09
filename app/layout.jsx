// root layout
// using app router -> you need to write [ html { head } { body} ]
import '@/assets/styles/globals.css'; // don't forget this :)

// meta data in complete applicatoin - applayout
export const metadata = {
  title: 'Default Title',
  description: 'This is a default description for the whole app.',
  keywords: 'nextjs, app, layout, metadata',
  // Add other meta tags as needed
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to my app" />
      </head>
      <body className="text-red-700">
        {children}
      </body>
    </html>
  );
}
