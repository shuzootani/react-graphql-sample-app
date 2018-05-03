import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'

class LyricNew extends Component {
  constructor() {
    super()

    this.state = {
      content: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const { mutate, songId } = this.props
    const { content } = this.state
    mutate({
      variables: { content, songId },
    })
      .then(() => {
        this.setState({ content: '' })
      })
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Lyric</label>
          <input
            onChange={e => this.setState({ content: e.target.value })}
            value={this.state.content}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricNew)
