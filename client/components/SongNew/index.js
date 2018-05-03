import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../../queries/fetchSongs'

class SongNew extends Component {
  constructor() {
    super()

    this.state = {
      title: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query }],
      })
      .then(() => hashHistory.push('/'))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <form onSubmit={this.onSubmit}>
          <label>Song Title</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default graphql(mutation)(SongNew)
