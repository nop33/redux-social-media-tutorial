import React from 'react'
import { Link } from 'react-router-dom'

import { useSelectPost } from './postsSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'

const SinglePostPage = ({
  match: {
    params: { postId },
  },
}) => {
  const post = useSelectPost(postId)

  return post ? (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <PostAuthor userId={post.user} />
      </article>
      <div>
        <ReactionButtons post={post} />
      </div>
      <div>
        <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
      </div>
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
