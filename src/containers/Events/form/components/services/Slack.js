/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import axios from 'axios'
import { reduxForm, change } from 'redux-form'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from 'material-ui/TextField'
import { InputAdornment } from 'material-ui/Input'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import { SLACK_API_URL } from 'constants/common'

const suggestions = []
const SLACK_CHANNELS_LIST = `${SLACK_API_URL}/channels.list?token=${process.env.REACT_APP_SLACK_TOKEN}`

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, ...other } = inputProps

  return (
    <TextField
      autoFocus={autoFocus}
      label="Slack channel"
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        startAdornment: <InputAdornment position="start">#</InputAdornment>,
        ...other,
      }}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span
              key={index}
              style={{
                fontWeight: 300,
              }}
            >
              {part.text}
            </span>
          ) : (
            <strong
              key={index}
              style={{
                fontWeight: 500,
              }}
            >
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep = count < 3 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
    width: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
  serviceIcon: {
    width: 100,
    height: 50,
  },
})

class SlackInput extends React.Component {
  state = {
    value: '',
    suggestions: [],
  }

  componentDidMount = () => {
    axios.get(`${SLACK_CHANNELS_LIST}`).then(res => {
      res.data.channels.map(channel => suggestions.push({ label: channel.name }))
      this.setState({ suggestions })
    })
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  handleChange = (event, { newValue }) => {
    this.setState({ value: newValue })
    this.props.change('slackChannel', newValue)
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            autoFocus: true,
            classes,
            placeholder: 'channel',
            value: this.state.value,
            onChange: this.handleChange,
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  change: (name, value) => dispatch(change('AddEventForm', name + value)),
})

SlackInput.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  connect(mapDispatchToProps, null),
  reduxForm({ form: 'AddEventForm', destroyOnUnmount: false, forceUnregisterOnUnmount: true })
)(SlackInput)
