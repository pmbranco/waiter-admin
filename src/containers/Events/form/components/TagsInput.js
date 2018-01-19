import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { reduxForm, change } from 'redux-form'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  chipContainer: {
    margin: 10,
  },
})

// eslint-disable-next-line
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

export class TagsInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chips: [],
      Key: {
        backspace: 8,
        tab: 9,
        enter: 13,
      },
      INVALID_CHARS: /[^a-zA-Z0-9 ]/g,
    }
  }

  static defaultProps = {
    placeHolder: 'Enter a tag...',
    maxLength: 20,
    max: 20,
  }

  componentDidMount = () => {
    this.setChips(this.props.chips)
  }

  componentWillReceiveProps = nextProps => {
    this.setChips(nextProps.chips)
  }

  setChips = chips => {
    if (chips && chips.length) {
      this.setState({ chips: chips })
    }
  }

  onKeyDown = event => {
    var keyPressed = event.which

    if (keyPressed === this.state.Key.enter || (keyPressed === this.state.Key.tab && event.target.value)) {
      event.preventDefault()
      this.updateChips(event)
    } else if (keyPressed === this.state.Key.backspace) {
      var chips = this.state.chips

      if (!event.target.value && chips.length) {
        this.deleteChip(chips[chips.length - 1])
      }
    }
  }

  updateChips = event => {
    if (!this.props.max || this.state.chips.length < this.props.max) {
      var value = event.target.value

      if (!value) return

      var chip = value.trim().capitalize()

      if (chip && this.state.chips.indexOf(chip) < 0) {
        this.setState({
          chips: update(this.state.chips, { $push: [chip] }),
        })
      }
      event.target.value = ''
    }
  }

  deleteChip = chip => {
    var index = this.state.chips.indexOf(chip)

    if (index >= 0) {
      this.setState({
        chips: update(this.state.chips, {
          $splice: [[index, 1]],
        }),
      })
    }
  }

  focusInput = event => {
    var children = event.target.children

    if (children.length) {
      children[children.length - 1].focus()
    }
  }

  clearInvalidChars = event => {
    var value = event.target.value

    if (this.state.INVALID_CHARS.test(value)) {
      event.target.value = value.replace(this.state.INVALID_CHARS, '')
    } else if (value.length > this.props.maxLength) {
      event.target.value = value.substr(0, this.props.maxLength)
    }
  }

  render() {
    var _this = this
    const { classes } = this.props

    var placeHolder = this.props.placeHolder
    this.props.change('tags', this.state.chips)

    return (
      <div className={classes.chipContainer}>
        <Grid container direction="row" spacing={8}>
          {this.state.chips.map(function(chip, index) {
            return (
              <Grid item>
                <Chip label={chip} key={index} onRequestDelete={_this.deleteChip.bind(null, chip)} />
              </Grid>
            )
          })}
        </Grid>
        <TextField
          placeholder={placeHolder}
          inputProps={this.state.chips}
          onKeyUp={this.clearInvalidChars}
          onKeyDown={this.onKeyDown}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  change: (name, value) => dispatch(change('AddEventForm', name, value)),
})

TagsInput.PropTypes = {
  placeHolder: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default compose(
  withStyles(styles),
  connect(mapDispatchToProps, null),
  reduxForm({ form: 'AddEventForm', destroyOnUnmount: false, forceUnregisterOnUnmount: true })
)(TagsInput)
