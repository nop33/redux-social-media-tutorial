import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import AddPostForm from './features/posts/AddPostForm'
import EditPostPage from './features/posts/EditPostPage'
import PostsList from './features/posts/PostsList'
import SinglePostPage from './features/posts/SinglePostPage'
import UsersList from './features/users/UsersList'
import UserPage from './features/users/UserPage'
import NotificationsList from './features/notifications/NotificationsList'

function App() {
  console.log('App renders')

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <section>
                  <h2>Welcome to the Redux Essentials example app!</h2>
                </section>
                <PostsList />
                <AddPostForm />
              </>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/posts/:postId/edit" component={EditPostPage} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
