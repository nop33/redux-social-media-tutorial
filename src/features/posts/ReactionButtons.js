import React from 'react'
import { useDispatch } from 'react-redux'

import { addReaction } from './postsSlice'

const reactions = {
  thumbsUp: '👍',
  eyes: '👀',
  heart: '❤️',
  hooray: '🎉',
  rocket: '🚀',
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  return (
    <div>
      {Object.entries(reactions).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(addReaction({ postId: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name]}
        </button>
      ))}
    </div>
  )
}

export default ReactionButtons
