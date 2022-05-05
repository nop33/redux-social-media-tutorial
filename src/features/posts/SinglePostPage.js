import React from 'react'
import { Link } from 'react-router-dom'

import { useSelectPost } from './postsSlice'

const SinglePostPage = ({
  match: {
    params: { postId },
  },
}) => {
  const post = useSelectPost(postId)

  return post ? (
    <section>
      <article>
        <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </article>
      <div>
        <Link to="/">All posts</Link>
      </div>
    </section>
  ) : (
    <section>
      <h2>Post not found</h2>
    </section>
  )
}

export default SinglePostPage
