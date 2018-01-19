import React, { Component } from 'react'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import compose from 'recompose/compose'
import { reduxForm } from 'redux-form'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginTop: theme.spacing.unit,
  },
  margin: {
    margin: 4,
  },
})

export class HandleServices extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChange = name => event => {
    this.props.handleServiceActivation(name, event.target.checked)
  }

  render() {
    const { classes, activeStep, handleBack, handleSubmit, isActivated } = this.props

    return (
      <form onSubmit={handleSubmit} className={classes.margin}>
        <FormGroup row>
          <FormControlLabel
            control={<Switch checked={isActivated.github} onChange={this.handleChange('github')} value="GitHub" />}
            label="GitHub"
          />
          <FormControlLabel
            control={<Switch checked={isActivated.gitlab} onChange={this.handleChange('gitlab')} value="GitLab" />}
            label="GitLab"
          />
          <FormControlLabel
            control={<Switch checked={isActivated.slack} onChange={this.handleChange('slack')} value="Slack" />}
            label="Slack"
          />
        </FormGroup>
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
  reduxForm({ form: 'AddEventForm', destroyOnUnmount: false, forceUnregisterOnUnmount: true })
)(HandleServices)
