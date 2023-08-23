import React from 'react'

export default function layout({children}: {
  children: React.ReactNode;
}) {
  return (
    <article className='max-w-6xl m-auto'>
    {children}
    </article>
  )
}
