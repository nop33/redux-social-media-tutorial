import React from 'react'
import { Link } from 'react-router-dom'

import { useSelectPosts } from './postsSlice'

const PostsList = () => {
  const posts = useSelectPosts()

  console.log('PostsList renders')

  return (
    <section>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <article>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostsList
