import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useSelectPosts, useSelectPostsStatus, fetchPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import Spinner from '../../components/Spinner'
import { TimeAgo } from './TimeAgo'

const PostsList = () => {
  const posts = useSelectPosts()
  const status = useSelectPostsStatus()
  const dispatch = useDispatch()

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  console.log('PostsList renders')

  return (
    <section>
      <h2>Posts</h2>
      {status === 'loading' && <Spinner />}
      {status === 'succeeded' && (
        <ul>
          {orderedPosts.map((post) => (
            <li key={post.id}>
              <article>
                <h3>{post.title}</h3>
                <div>
                  <PostAuthor userId={post.user} /> about{' '}
                  <TimeAgo timestamp={post.date} />
                </div>
                <p>{post.content}</p>

                <Link to={`/posts/${post.id}`} className="button muted-button">
                  View Post
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PostsList
