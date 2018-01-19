import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import WaitListItem from './components/WaitListItem'

export default class WaitsList extends Component {
  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Typography type="title">Waits</Typography>
              </Grid>
              {/* {this.state.events.map(event => (
                <Grid item key={wait._id} xs={12} sm={6} md={4} lg={4} xl={3}>
                  <WaitListItem id={wait._id} name={wait.name} description={wait.description} />
                </Grid>
              ))} */}
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <WaitListItem />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <WaitListItem />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <WaitListItem />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <WaitListItem />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <WaitListItem />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                <WaitListItem />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}
