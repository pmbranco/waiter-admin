import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

export default class About extends Component {
  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Typography type="title">About</Typography>
        </Grid>
      </div>
    )
  }
}
