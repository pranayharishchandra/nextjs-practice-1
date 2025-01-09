// app/posts/[id]/page.js
export async function generateMetadata({ params }) {
  const postId = params.id;
  const post = await fetchPostById(postId); // Simulated function to fetch post data

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  };
}

export default async function PostPage({ params }) {
  const postId = params.id;
  const post = await fetchPostById(postId); // Fetch post data

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
