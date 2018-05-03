import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './components/App'
import SongList from './components/SongList'
import SongNew from './components/SongNew'
import SongDetail from './components/SongDetail'

const client = new ApolloClient({
  // refetch using Cached Object Id
  dataIdFromObject: object => object.id,
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongNew} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
