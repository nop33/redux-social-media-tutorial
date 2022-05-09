import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  useSelectPosts,
  useSelectPostsStatus,
  fetchPosts,
  selectPostIds,
  useSelectPost,
} from './postsSlice'
import PostAuthor from './PostAuthor'
import Spinner from '../../components/Spinner'
import { TimeAgo } from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostExcerpt = ({ postId }) => {
  console.log('PostExcerpt renders')

  const post = useSelectPost(postId)

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} /> about{' '}
        <TimeAgo timestamp={post.date} />
      </div>
      <p>{post.content}</p>
      <ReactionButtons post={post} />

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

const PostsList = () => {
  // const posts = useSelectPosts()
  const status = useSelectPostsStatus()
  const dispatch = useDispatch()

  const orderedPostIds = useSelector(selectPostIds)
  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  console.log('PostsList renders')

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {status === 'loading' && <Spinner />}
      {status === 'succeeded' &&
        orderedPostIds.map((postId) => (
          <PostExcerpt postId={postId} key={postId} />
        ))}
    </section>
  )
}

export default PostsList
