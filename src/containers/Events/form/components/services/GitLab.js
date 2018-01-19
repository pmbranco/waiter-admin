import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { Field, reduxForm, change } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import { LinearProgress } from 'material-ui/Progress'
import { asyncValidateGitlab as asyncValidate } from './asyncValidate'
import ServiceLink from 'components/ServiceLink'

const styles = theme => ({})

const validate = values => {
  const errors = {}
  const requiredFields = ['gitlabRepoURL']
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
      fullWidth={true}
      {...input}
      {...custom}
    />{' '}
    {asyncValidating && <LinearProgress mode="query" />}
  </div>
)

export class GitLabInput extends Component {
  render() {
    const { status, owner, repo } = this.props
    if (status) {
      this.props.change('owner', status.owner)
      this.props.change('repo', status.repo)
    }
    return (
      <div>
        <Grid container direction="column">
          <Grid item>
            <Field name="gitlabRepoURL" component={renderTextField} label="URL" />
          </Grid>
          <Grid item>
            {owner &&
              repo && (
                <ServiceLink
                  service={{
                    name: 'gitlab',
                    services_x_events: {
                      service_data: [
                        {
                          owner: owner,
                          repo: repo,
                        },
                      ],
                    },
                  }}
                />
              )}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.form.AddEventForm.asyncErrors,
    owner: state.form.AddEventForm.values.owner,
    repo: state.form.AddEventForm.values.repo,
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  change: (name, value) => dispatch(change('AddEventForm', name, value)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'AddEventForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    asyncValidate,
    asyncBlurFields: ['gitlabRepoURL'],
  })
)(GitLabInput)
