import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import { NGINX_URL, SLACK_URL, GITHUB_URL, GITLAB_URL } from '../constants/common'
import Tooltip from 'material-ui/Tooltip'

const styles = theme => ({
  serviceIcon: {
    width: 20,
    height: 20,
  },
})

const getSpecificServiceLink = service => ({
  slack: (
    <a
      className="serviceLink"
      target="_blank"
      href={`${SLACK_URL}/${service.services_x_events.service_data[0].channel}`}
    >
      #{service.services_x_events.service_data[0].channel}
    </a>
  ),
  gitlab: (
    <a
      className="serviceLink"
      target="_blank"
      href={`${GITLAB_URL}/${service.services_x_events.service_data[0].owner}/${
        service.services_x_events.service_data[0].repo
      }`}
    >
      {service.services_x_events.service_data[0].owner}/{service.services_x_events.service_data[0].repo}
    </a>
  ),
  github: (
    <a
      className="serviceLink"
      target="_blank"
      href={`${GITHUB_URL}/${service.services_x_events.service_data[0].owner}/${
        service.services_x_events.service_data[0].repo
      }`}
    >
      {service.services_x_events.service_data[0].owner}/{service.services_x_events.service_data[0].repo}
    </a>
  ),
})

const serviceDisplayName = {
  slack: 'Slack',
  gitlab: 'GitLab',
  github: 'GitHub',
}

class ServiceLink extends Component {
  render() {
    const { classes, service } = this.props

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item>
            <ReactSVG
              path={`${NGINX_URL}/images/waits/${service.name.toLowerCase()}.svg`}
              className={classes.serviceIcon}
            />
          </Grid>
          <Grid item>
            <Tooltip title={`View on ${serviceDisplayName[service.name]}`} placement="bottom">
              <Typography>{getSpecificServiceLink(service)[service.name]}</Typography>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    )
  }
}

ServiceLink.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ServiceLink)
