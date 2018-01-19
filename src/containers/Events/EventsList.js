import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import axios from 'axios'
import EventListItem from './components/EventListItem'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants/common'

const styles = theme => ({
  absolute: {
    flip: false,
    position: 'fixed',
    bottom: 32,
    right: 32,
  },
})

class EventsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
    }
  }

  componentDidMount = () => {
    axios.get(`${API_URL}/event`).then(res => {
      const events = res.data.data.events
      this.setState({ events })
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Typography type="title">Events</Typography>
              </Grid>
              {this.state.events.map(event => (
                <Grid item key={event._id} xs={12} sm={6} md={4} lg={4} xl={3}>
                  <EventListItem id={event._id} name={event.name} description={event.description} latitude={event.location[1]} longitude={event.location[0]} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Link to={'/event/add'}>
          <Tooltip placement="top" title="Add event">
            <Button fab color="primary" className={classes.absolute}>
              <AddIcon />
            </Button>
          </Tooltip>
        </Link>
      </div>
    )
  }
}

EventsList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EventsList)
