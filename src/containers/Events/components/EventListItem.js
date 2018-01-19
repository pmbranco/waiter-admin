import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'

const styles = {
  card: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: 200,
  },
  navLink: {
    textDecoration: 'none',
  },
}

class EventItem extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={`http://maps.google.com/maps/api/staticmap?size=2048x2048&zoom=15&markers=size:mid|${this.props.latitude},${this.props.longitude}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              {this.props.name}
            </Typography>
            <Typography component="p">{this.props.description}</Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary">
              Share
            </Button>
            <Link
              to={`/event/${encodeURIComponent(this.props.name)}/${encodeURIComponent(this.props._id)}`}
              className={classes.navLink}
            >
              <Button dense color="primary">
                Learn More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }
}

EventItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EventItem)
