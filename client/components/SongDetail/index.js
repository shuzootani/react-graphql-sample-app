import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import LyricNew from '../LyricNew'
import LyricList from '../LyricList'

const SongDetail = ({ loading, data }) => {
  const { song } = data
  if (loading || !song) return <div>Loading...</div>
  return (
    <div>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricNew songId={song.id} />
    </div>
  )
}

const query = gql`
  query fetchSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(query, {
  options: props => {
    return {
      variables: {
        id: props.params.id,
      },
    }
  },
})(SongDetail)
