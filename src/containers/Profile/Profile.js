import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Typography type="title">Profile</Typography>
        </Grid>
      </div>
    )
  }
}
