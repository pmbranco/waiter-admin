import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

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

class WaitItem extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="https://data.bloggif.com/distant/user/store/6/e/7/1/58f66c006c785ece3522ebd1335417e6.png"
            //https://hdqwalls.com/download/material-design-blue-and-white-to-2048x2048.jpg
            //https://data.bloggif.com/distant/user/store/6/e/7/1/58f66c006c785ece3522ebd1335417e6.png
            title="Javascript"
          />
          <CardContent>
            <Typography type="headline" component="h2">
              Javascript
            </Typography>
            <Typography component="p">
              JavaScript is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted
              programming language.
            </Typography>
          </CardContent>
          <CardActions>
            <Button dense color="primary">
              Share
            </Button>
            <Button dense color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

WaitItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(WaitItem)
