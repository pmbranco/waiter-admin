import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import compose from 'recompose/compose'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import HandleInformations from './HandleInformations'
import HandleServices from './HandleServices'
import HandleTags from './HandleTags'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  resetContainer: {
    marginTop: 0,
    padding: theme.spacing.unit * 3,
  },
  transition: {
    paddingBottom: 4,
  },
})

function getSteps() {
  return ['Enter event information', 'Select services to pull data from', 'Add labels related to the event']
}

function replacer(key, value) {
  if (value === null) return undefined
  return value
}

const details = _this => {
  return (
    <Button color="accent" dense onClick={() => _this.showResults(_this.props.reduxForm.values)}>
      Details
    </Button>
  )
}

class AddEventStepper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      snackbar: {
        open: false,
        vertical: null,
        horizontal: null,
      },
    }
  }

  handleClick = state => () => {
    this.setState({
      open: true,
      ...state,
    })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  showResults = values => {
    window.alert(
      JSON.stringify(
        {
          name: values.eventName,
          description: values.eventDescription,
          services: {
            github: values.githubRepoURL
              ? {
                  url: values.githubRepoURL,
                  owner: values.owner,
                  repo: values.repo,
                }
              : null,
            gitlab: values.gitlabRepoURL
              ? {
                  url: values.gitlabRepoURL,
                  repo: values.gitlabRepoName,
                }
              : null,
            slack: values.slackChannel
              ? {
                  channel: values.slackChannel,
                }
              : null,
          },
          tags: values.tags,
        },
        replacer,
        2
      )
    )
  }

  render() {
    const {
      classes,
      activeStep,
      handleBack,
      handleNext,
      handleReset,
      isActivated,
      handleServiceActivation,
    } = this.props
    const { vertical, horizontal, open } = this.state
    const steps = getSteps()

    return (
      <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent
                  classes={{
                    transition: classes.transition,
                  }}
                >
                  {index === 0 && (
                    <HandleInformations activeStep={index} handleBack={handleBack} onSubmit={handleNext} />
                  )}
                  {index === 1 && (
                    <HandleServices
                      activeStep={index}
                      handleBack={handleBack}
                      onSubmit={handleNext}
                      isActivated={isActivated}
                      handleServiceActivation={handleServiceActivation}
                    />
                  )}
                  {index === 2 && <HandleTags activeStep={index} handleBack={handleBack} handleNext={handleNext} />}
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you can now add your event.</Typography>
            <Grid container justify="flex-end">
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
              <Button
                raised
                color="primary"
                className={classes.button}
                onClick={this.handleClick({ vertical: 'bottom', horizontal: 'right' })}
              >
                Add event
              </Button>
            </Grid>
          </Paper>
        )}
        <Snackbar
          anchorOrigin={{
            vertical,
            horizontal,
          }}
          open={open}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id"> Event successfully added </span>}
          action={details(this)}
        />
      </div>
    )
  }
}

AddEventStepper.propTypes = {
  classes: PropTypes.object,
}

function mapStateToProps(state) {
  return { reduxForm: state.form.AddEventForm }
}

export default compose(withStyles(styles), connect(mapStateToProps, null), reduxForm({ form: 'AddEventForm' }))(
  AddEventStepper
)
