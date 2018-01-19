import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Card, { CardHeader } from 'material-ui/Card'
import MenuItem from 'material-ui/Menu/MenuItem'
import Select from 'material-ui/Select'
import Input from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'

const periodFilters = [
  { id: 1, value: 'now-24h', text: 'Last 24 hours' },
  { id: 2, value: 'now-7d', text: 'Last 7 days' },
  { id: 3, value: 'now-30d', text: 'Last 30 days' },
]

const eventFilters = [
  { id: 4, value: 'general', text: 'General' },
  { id: 5, value: 'Waiter', text: 'Waiter' },
  { id: 6, value: 'UBD', text: 'UBD' },
]

export default class Logs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      period: 'now-24h',
      event: 'general',
    }
  }

  handlePeriodChange = period => {
    this.setState({
      period: period,
    })
  }

  handleEventChange = event => {
    this.setState({
      event: event,
    })
  }

  render() {
    // on fait descendre les valeurs de period et de event jusqu'aux filtres via les props
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Card>
              <CardHeader title="Logs" />
              <FilterRow
                period={this.state.period}
                event={this.state.event}
                handlePeriodChange={this.handlePeriodChange}
                handleEventChange={this.handleEventChange}
              />
              <LogsWindow period={this.state.period} event={this.state.event} />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

class FilterRow extends Component {
  handlePeriodChange = period => {
    this.props.handlePeriodChange(period)
  }
  handleEventChange = event => {
    this.props.handleEventChange(event)
  }

  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={11}>
            <Card>
              <CardHeader title="Filters" />
              <Filter
                type="Period"
                optionsList={periodFilters}
                value={this.props.period}
                handleFilterUpdate={this.handlePeriodChange}
              />
              <Filter
                type="Event"
                optionsList={eventFilters}
                value={this.props.event}
                handleFilterUpdate={this.handleEventChange}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

class Filter extends Component {
  handleFilterUpdate = elem => {
    this.props.handleFilterUpdate(elem.target.value)
  }

  render() {
    const { optionsList } = this.props

    let menuItems = []
    optionsList.forEach(option => {
      menuItems.push(
        <MenuItem value={option.value} key={option._id}>
          {option.text}
        </MenuItem>
      )
    })

    return (
      <Grid item>
        <form autoComplete="off">
          <FormControl>
            <Select
              value={this.props.value}
              onChange={this.handleFilterUpdate}
              input={<Input id={`${this.props.type.toLowerCase()}-input`} />}
              autoWidth
            >
              {menuItems}
            </Select>
            <FormHelperText>{this.props.type}</FormHelperText>
          </FormControl>
        </form>
      </Grid>
    )
  }
}

class LogsWindow extends Component {
  render() {
    // const { period, event } = this.props
    // je pense que c'est ici que je recup les fichiers et que je les parse
    // ensuite je cree x <Log></Log>
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={11}>
            <Card>
              <CardHeader title="LogsWindow" />
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

// class Log extends Component {
//   render() {
//     //const { isError, date, message } = this.props
//     // Props : isError, Date, Message
//     return <div>Log</div>
//   }
// }
