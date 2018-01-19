import React from 'react'
import { withStyles } from 'material-ui/styles'
import ReactQueryParams from 'react-query-params'
import Grid from 'material-ui/Grid'
import Card, {CardHeader, CardContent} from 'material-ui/Card'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'

const styles = theme => ({
  kibanaEventDashboard: {
    width: '100%',
    height: 1600,
    border: 'none',
  },
})

class Overview extends ReactQueryParams {
  constructor(props) {
    super(props)

    const period = this.queryParams.period
      ? this.queryParams.period
      : 'now-7d'

    this.state = {
      period: period
    }
  }

  handlePeriodChange = name => event => {
    this.setState({[name]: event.target.value})
    this.setQueryParams({[name]: event.target.value})
  }

  render() {
    const { classes } = this.props
    const { period } = this.state

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Card>
              <CardHeader
                title={
                  <Grid container justify="space-between">
                    <Grid item>Overview</Grid>
                    <Grid item>
                      <form autoComplete="off">
                        <FormControl>
                          <Select
                            value={this.state.period}
                            onChange={this.handlePeriodChange('period')}
                            input={<Input id="period-input" />}
                            autoWidth>
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
                }/>
              <CardContent>
                <iframe
                  name="kibana-dashboard"
                  title="Dashboard Kibana"
                  className={classes.kibanaEventDashboard}
                  src={`http://ec2-52-31-90-93.eu-west-1.compute.amazonaws.com:5601/app/kibana#/dashboard/AV_9V7BxF-AuAQuesvVA?embed=true&_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:${period},mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:7,id:AV_fps6pF-AuAQuerVuy,panelIndex:3,row:4,size_x:3,size_y:3,type:visualization),(col:1,id:AV_flMBKF-AuAQuerUmQ,panelIndex:4,row:10,size_x:12,size_y:3,type:visualization),(col:7,id:AV_f0AEfF-AuAQuerYTa,panelIndex:6,row:1,size_x:3,size_y:3,type:visualization),(col:10,id:AV_f09HcF-AuAQuerYir,panelIndex:7,row:4,size_x:3,size_y:3,type:visualization),(col:1,id:AV_9Ta1SF-AuAQuesvR3,panelIndex:8,row:7,size_x:12,size_y:3,type:visualization),(col:1,id:AV_9V0neF-AuAQuesvU3,panelIndex:9,row:13,size_x:12,size_y:3,type:visualization),(col:10,id:AV_9X8jzF-AuAQuesvXh,panelIndex:10,row:1,size_x:3,size_y:3,type:visualization),(col:1,id:AV_9ZkF8F-AuAQuesvZi,panelIndex:11,row:1,size_x:6,size_y:6,type:visualization)),query:(match_all:()),timeRestore:!t,title:'General+Dashboard',uiState:(P-10:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-2:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-3:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-4:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-6:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-7:(vis:(defaultColors:('0+-+100':'rgb(0,104,55)'))),P-8:(vis:(defaultColors:('0+-+28':'rgb(247,252,245)','28+-+55':'rgb(199,233,192)','55+-+83':'rgb(116,196,118)','83+-+110':'rgb(35,139,69)')))),viewMode:view)`}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Overview)
