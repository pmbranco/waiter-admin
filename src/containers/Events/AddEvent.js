import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { reduxForm, reset } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import AddEventStepper from './form/components/AddEventStepper'
import EventInformations from './form/components/EventInformations'
import EventServices from './form/components/EventServices'
import EventTags from './form/components/EventTags'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = theme => ({})

class AddEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      isActivated: {
        github: false,
        gitlab: false,
        slack: false,
      },
    }
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    })
  }

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    })
  }

  handleReset = () => {
    this.setState({ activeStep: 0, isActivated: false })
    this.props.dispatch(reset('AddEventForm'))
  }

  handleServiceActivation = (service, value) => {
    switch (service) {
      case 'github':
        this.setState({
          isActivated: {
            ...this.state.isActivated,
            github: value,
            gitlab: false,
          },
        })
        break
      case 'gitlab':
        this.setState({
          isActivated: {
            ...this.state.isActivated,
            gitlab: value,
            github: false,
          },
        })
        break
      default:
        this.setState({
          isActivated: {
            ...this.state.isActivated,
            [service]: value,
          },
        })
    }
  }

  render() {
    const { classes } = this.props
    const { activeStep, isActivated } = this.state

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={4} lg={4} xl={2}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography type="headline" component="h2">
                      Add a event
                    </Typography>
                    <AddEventStepper
                      isActivated={isActivated}
                      activeStep={activeStep}
                      handleBack={this.handleBack}
                      handleNext={this.handleNext}
                      handleReset={this.handleReset}
                      handleServiceActivation={this.handleServiceActivation}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={4}>
            <Grid container spacing={16}>
              <EventInformations />{' '}
              {activeStep > 0 && <EventServices activeStep={activeStep} isActivated={isActivated} />}
              {activeStep > 1 && <EventTags />}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

AddEvent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'AddEventForm',
    destroyOnUnmount: false,
    initialValues: {
      eventName: '',
      eventDescription: '',
    },
  })
)(AddEvent)
