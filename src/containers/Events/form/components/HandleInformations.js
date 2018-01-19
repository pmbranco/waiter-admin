import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import compose from 'recompose/compose'
import asyncValidate from '../asyncValidate'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginTop: theme.spacing.unit,
  },
})

const validate = values => {
  const errors = {}
  const requiredFields = ['eventName', 'eventDescription']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({ input, label, meta: { asyncValidating, touched, error }, ...custom }) => (
  <div>
    <TextField
      margin="normal"
      label={label}
      placeholder={label}
      error={touched && error ? true : false}
      helperText={touched && error}
      {...input}
      {...custom}
    />{' '}
    {asyncValidating && (
      <CircularProgress
        style={{
          margin: 0,
        }}
        size={20}
      />
    )}
  </div>
)

const eventDescription = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    margin="normal"
    multiline
    rowsMax="4"
    label={label}
    placeholder={label}
    error={touched && error ? true : false}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

export class HandleInformations extends Component {
  render() {
    const { classes, activeStep, handleBack, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="eventName" component={renderTextField} label="Event name" />
        </div>
        <div>
          <Field name="eventDescription" component={eventDescription} label="Description" />
        </div>
        <div className={classes.actionsContainer}>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Back
            </Button>
            <Button type="submit" raised color="primary" className={classes.button}>
              Next
            </Button>
          </div>
        </div>
      </form>
    )
  }
}

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'AddEventForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    asyncValidate,
    asyncBlurFields: ['eventName'],
  })
)(HandleInformations)
