'use client'

import { useRouter } from 'next/router'

// const dynamicPostPage = () => {
//   const router = useRouter()
//   const id = router.query.id;
  
//   return (
//     <div>
//       {`hello from dynamic route: /posts/${id}`}
//     </div>
//   )
// }

// export default dynamicPostPage

import React from 'react'
// Remove next/router import
import { useParams } from 'next/navigation' // Add this instead

const DynamicPostPage = () => {  // Capitalize component name (React convention)
  // Remove router.query usage
  const params = useParams()
  const id = params.id
  
  return (
    <div>
      {`hello from dynamic route: /posts/${id}`}
    </div>
  )
}

export default DynamicPostPage