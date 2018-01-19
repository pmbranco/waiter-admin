import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Card, { CardContent } from 'material-ui/Card'
import { API_URL } from '../../constants/common'

const styles = theme => ({})

class EditEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      event: {
        technos: [],
        services: [],
      },
    }
  }

  componentDidMount = () => {
    axios
      .get(`${API_URL}/event/${this.props.match.params._id}`)
      .then(res => {
        this.setState({ event: res.data.data.event })
      })
      .catch(err => {
        console.log(err)
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
                <Card className={classes.card}>
                  <CardContent>
                    <Typography type="headline" component="h2">
                      Edit Event
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

EditEvent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EditEvent)
