import React from 'react'
import {
  MainLayout,
  Profile,
  Home,
  EventsList,
  EventView,
  AddEvent,
  EditEvent,
  WaitsList,
  User,
  Logs,
  Settings,
  Feedback,
} from 'containers'
import { Overview, About } from 'components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from '../styles/theme'

function Routes() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/home" component={Home} />
              <Route path="/overview" component={Overview} />
              <Route exact path="/events" component={EventsList} />
              <Route exact path="/event/add" component={AddEvent} />
              <Route exact path="/event/:name/:id/edit" component={EditEvent} />
              <Route exact path="/event/:id/edit" component={EditEvent} />
              <Route exact path="/event/:name/:id" component={EventView} />
              <Route exact path="/event/:id" component={EventView} />
              <Route path="/waits" component={WaitsList} />
              <Route path="/user" component={User} />
              <Route path="/logs" component={Logs} />
              <Route path="/settings" component={Settings} />
              <Route path="/feedback" component={Feedback} />
              <Route path="/about" component={About} />
            </Switch>
          </MainLayout>
        </Switch>
      </MuiThemeProvider>
    </Router>
  )
}

export default Routes
