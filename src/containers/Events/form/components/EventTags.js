import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { reduxForm } from 'redux-form'
import Grid from 'material-ui/Grid'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Chip from 'material-ui/Chip'

const styles = theme => ({
  tags: {
    marginTop: 4,
  },
})

export class EventTags extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { classes, tags } = this.props

    if (tags.length === 0) return null
    else {
      return (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2">
                Tags
              </Typography>
              <Grid container direction="row" spacing={8} className={classes.tags}>
                {tags.map(function(chip, index) {
                  return (
                    <Grid item>
                      <Chip label={chip} key={index} />
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )
    }
  }
}

function mapStateToProps(state) {
  return { tags: state.form.AddEventForm.values.tags }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, null),
  reduxForm({ form: 'AddEventForm', destroyOnUnmount: false })
)(EventTags)
