import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { LyricItemStyle } from './style'

const LyricList = ({ lyrics, mutate }) => {
  const onLike = (id, likes) => {
    mutate({
      variables: { id },
      // Pre-Update UI by Guessing Response
      optimisticResponse: {
        _typename: 'Mutation',
        likeLyric: {
          id,
          _typename: 'LyricType',
          likes: likes + 1,
        },
      },
    }).catch(e => console.log(e))
  }

  return (
    <div>
      <ul>
        {lyrics &&
          lyrics.map(({ id, content, likes }) => {
            return (
              <li className={LyricItemStyle} key={id}>
                {content}
                <i className="material-icons right" onClick={() => onLike(id, likes)}>
                  thumb_up
                </i>
                <span className="right">{likes}</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)
