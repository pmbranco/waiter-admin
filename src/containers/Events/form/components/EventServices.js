import React, { Component } from 'react'
import classNames from 'classnames'
import GitHubInput from './services/GitHub'
import GitLabInput from './services/GitLab'
import SlackInput from './services/Slack'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import compose from 'recompose/compose'
import { reduxForm } from 'redux-form'
import { NGINX_URL } from 'constants/common'

const styles = theme => ({
  inactiveCard: {
    opacity: 0.3,
  },
  media: {
    height: 100,
    backgroundSize: 'contain',
    width: '50%',
    margin: 'auto',
  },
})

export class EventServices extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { classes, activeStep, isActivated } = this.props
    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              style={{
                marginBottom: 20,
              }}
            >
              Event services
            </Typography>
            <Grid container spacing={16}>
              <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={isActivated.github ? classes.media : classNames(classes.media, classes.inactiveCard)}
                    image={`${NGINX_URL}/images/waits/github-label.png`}
                    title="GitHub"
                  />{' '}
                  {isActivated.github && <Divider />}
                  <Collapse in={isActivated.github && activeStep === 1} transitionDuration="auto" unmountOnExit>
                    <CardContent>
                      <GitHubInput />
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
              <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={isActivated.gitlab ? classes.media : classNames(classes.media, classes.inactiveCard)}
                    image={`${NGINX_URL}/images/waits/gitlab-label.png`}
                    title="GitLab"
                  />{' '}
                  {isActivated.gitlab && <Divider />}
                  <Collapse in={isActivated.gitlab && activeStep === 1} transitionDuration="auto" unmountOnExit>
                    <CardContent>
                      <GitLabInput />
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
              <Grid item xs={10} sm={6} md={4} lg={4} xl={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={isActivated.slack ? classes.media : classNames(classes.media, classes.inactiveCard)}
                    image={`${NGINX_URL}/images/waits/slack-label.png`}
                    title="Slack"
                  />{' '}
                  {isActivated.slack && <Divider />}
                  <Collapse in={isActivated.slack && activeStep === 1} transitionDuration="auto" unmountOnExit>
                    <CardContent>
                      <SlackInput />
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default compose(withStyles(styles), reduxForm({ form: 'AddEventForm', destroyOnUnmount: false }))(
  EventServices
)
