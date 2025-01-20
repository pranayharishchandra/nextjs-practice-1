// app/posts/[id]/page.jsx (Server Component)

export const metadata = {
  title: 'Dynamic Post',
  description: 'This is a dynamic post page with the post ID as a route parameter.',
  keywords: 'dynamic, post, next.js, id',
};

import DynamicPostPage from './DynamicPostPage';

export default function PostPage() {
  return <DynamicPostPage />;
}
