import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'
import { SongItemStyle } from './style'
import query from '../../queries/fetchSongs'

const SongList = ({ loading, data, mutate }) => {
  const { songs, refetch } = data

  const onDelete = id => {
    mutate({
      variables: { id },
    })
      .then(() => refetch())
      .catch(e => console.log(e))
  }

  return (
    <div>
      {loading && 'Loading...'}
      <ul>
        {songs &&
          songs.map(({ id, title }) => {
            return (
              <li className={SongItemStyle} key={id}>
                <Link to={`/songs/${id}`}>{title}</Link>
                <i className="material-icons right" onClick={() => onDelete(id)}>
                  delete
                </i>
              </li>
            )
          })}
      </ul>
      <Link to="/songs/new" className="btn-floating teal right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  )
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(graphql(query)(SongList))
