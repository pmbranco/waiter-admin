import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactQueryParams from 'react-query-params'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Chip from 'material-ui/Chip'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import ModeEditIcon from 'material-ui-icons/ModeEdit'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants/common'
import ServiceLink from '../../components/ServiceLink'

const styles = theme => ({
  hide: {
    display: 'none',
  },
  absolute: {
    flip: false,
    position: 'fixed',
    bottom: 32,
    right: 32,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  serviceIcon: {
    width: 20,
    height: 20,
  },
  kibanaEventDashboard: {
    width: '100%',
    height: 650,
    border: 'none',
  },
})

class EventView extends ReactQueryParams {
  constructor(props) {
    super(props)

    const period = this.queryParams.period ? this.queryParams.period : 'now-7d'

    this.state = {
      event: {
        technos: [],
        services: [],
      },
      period: period,
    }
  }

  componentDidMount = () => {
    axios
      .get(`${API_URL}/event/${this.props.match.params._id}`)
      .then(res => {
        this.setState({ event: res.data.data.event })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handlePeriodChange = name => event => {
    this.setState({ [name]: event.target.value })
    this.setQueryParams({
      [name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props
    const { event, period } = this.state

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardHeader
                    title={
                      <Grid container justify="space-between">
                        <Grid item>{event.name}</Grid>
                        <Grid item>
                          <Button raised color="primary">
                            Follow
                          </Button>
                        </Grid>
                      </Grid>
                    }
                    subheader={
                      <Grid container>
                        {event.services.map(service => (
                          <Grid item key={service._id}>
                            <ServiceLink service={service} />
                          </Grid>
                        ))}
                      </Grid>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography component="p">{event.description}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider className={classNames(event.technos.length <= 0 && classes.hide)} />
                  <CardActions className={classNames(event.technos.length <= 0 && classes.hide)}>
                    <Grid container justify="flex-start">
                      <Grid item>
                        <Grid container>
                          {event.technos.map(techno => (
                            <Chip label={techno.name} className={classes.chip} key={techno._id} />
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    title={
                      <Grid container justify="space-between">
                        <Grid item>Activity</Grid>
                        <Grid item>
                          <form autoComplete="off">
                            <FormControl>
                              <Select
                                value={this.state.period}
                                onChange={this.handlePeriodChange('period')}
                                input={<Input id="period-input" />}
                                autoWidth
                              >
                                <MenuItem value={'now-24h'}>Last 24 hours</MenuItem>
                                <MenuItem value={'now-3d'}>Last 3 days</MenuItem>
                                <MenuItem value={'now-7d'}>Last 7 days</MenuItem>
                                <MenuItem value={'now-30d'}>Last 30 days</MenuItem>
                                <MenuItem value={'now-60d'}>Last 60 days</MenuItem>
                                <MenuItem value={'now-90d'}>Last 90 days</MenuItem>
                                <MenuItem value={'now-6M'}>Last 6 months</MenuItem>
                                <MenuItem value={'now-1y'}>Last 1 year</MenuItem>
                              </Select>
                              <FormHelperText>Period</FormHelperText>
                            </FormControl>
                          </form>
                        </Grid>
                      </Grid>
                    }
                  />
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12}>
                        <iframe
                          name="kibana-dashboard"
                          title="Dashboard Kibana"
                          className={classes.kibanaEventDashboard}
                          src={`http://ec2-52-31-90-93.eu-west-1.compute.amazonaws.com:5601/app/kibana#/dashboard/AV_fROmXF-AuAQuerPna?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:${
                            period
                          },mode:quick,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:'${
                            event.name
                          }',disabled:!f,index:AV-2RelvF-AuAQueiGZ8,key:event_name,negate:!f,type:phrase,value:'${
                            event.name
                          }'),query:(match:(event_name:(query:'${
                            event.name
                          }',type:phrase))))),options:(darkTheme:!f),panels:!((col:1,id:AV_fUwPkF-AuAQuerQfg,panelIndex:1,row:1,size_x:6,size_y:3,type:visualization),(col:9,id:AV_fps6pF-AuAQuerVuy,panelIndex:3,row:1,size_x:2,size_y:3,type:visualization),(col:1,id:AV_flMBKF-AuAQuerUmQ,panelIndex:4,row:4,size_x:6,size_y:3,type:visualization),(col:7,id:AV_fs2ECF-AuAQuerWg2,panelIndex:5,row:4,size_x:6,size_y:3,type:visualization),(col:7,id:AV_f0AEfF-AuAQuerYTa,panelIndex:6,row:1,size_x:2,size_y:3,type:visualization),(col:11,id:AV_f09HcF-AuAQuerYir,panelIndex:7,row:1,size_x:2,size_y:3,type:visualization)),query:(match_all:()),timeRestore:!t,title:'Event+Dashboard',uiState:(P-1:(vis:(legendOpen:!f)),P-2:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-3:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-4:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)')))),viewMode:view)`}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Link to={`/event/${event._id}/edit`}>
          <Tooltip placement="top" title="Edit event">
            <Button fab color="primary" className={classes.absolute}>
              <ModeEditIcon />
            </Button>
          </Tooltip>
        </Link>
      </div>
    )
  }
}

EventView.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EventView)
