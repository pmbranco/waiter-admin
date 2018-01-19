import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

export class EventInformations extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { eventName, eventDescription } = this.props

    if (eventName === '' && eventDescription === '') return null
    else {
      return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card>
            <CardContent>
              <Typography type="headline" component="h2">
                {eventName}
              </Typography>
              <Typography type="subheading" component="h2">
                {eventDescription}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    eventName: state.form.AddEventForm.values.eventName,
    eventDescription: state.form.AddEventForm.values.eventDescription,
  }
}

export default compose(connect(mapStateToProps, null), reduxForm({ form: 'AddEventForm', destroyOnUnmount: false }))(
  EventInformations
)
