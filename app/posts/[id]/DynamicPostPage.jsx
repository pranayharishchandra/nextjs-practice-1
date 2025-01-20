'use client';

import { useParams } from 'next/navigation';

// export const metadata = {
//   title: 'Dynamic Post',
//   description: 'This is a dynamic post page.',
//   keywords: 'dynamic, post, next.js',
// };

// const DynamicPostPage = () => {
//   const { id } = useParams();  // Access the dynamic route parameter (e.g., '123')

//   // Dynamically set the title based on the `id`
//   // metadata.title = `Post ${id} - Dynamic Route`;

//   return (
//     <div>
//       {`Hello from dynamic route: /posts/${id}`}
//     </div>
//   );
// };

import { useState } from "react";

export default function DynamicPostPage() {
  const [isToggled, setIsToggled] = useState(false);

  const { id } = useParams();

  const toggleState = () => setIsToggled((prev) => !prev);

  return (
    <div>
      {`Hello from dynamic route: /posts/${id}`}
      <h1>Toggle Button Example</h1>
      <p>Current State: {isToggled ? "True" : "False"}</p>
      <button onClick={toggleState}>
        {isToggled ? "Set to False" : "Set to True"}
      </button>
    </div>
  );
}

// export default DynamicPostPage;
