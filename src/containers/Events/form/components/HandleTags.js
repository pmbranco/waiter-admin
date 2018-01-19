import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { reduxForm } from 'redux-form'
import compose from 'recompose/compose'
import Button from 'material-ui/Button'
import TagsInput from './TagsInput'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginTop: theme.spacing.unit,
  },
})

export class HandleTags extends Component {
  render() {
    const { classes, activeStep, handleBack, handleNext } = this.props
    return (
      <form>
        <div>
          <Typography>Add waits, languages and frameworks used in this event</Typography>
          <TagsInput />
        </div>
        <div className={classes.actionsContainer}>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Back
            </Button>
            <Button raised color="primary" onClick={handleNext} className={classes.button}>
              Finish
            </Button>
          </div>
        </div>
      </form>
    )
  }
}

export default compose(
  withStyles(styles),
  reduxForm({ form: 'AddEventForm', destroyOnUnmount: false, forceUnregisterOnUnmount: true })
)(HandleTags)
