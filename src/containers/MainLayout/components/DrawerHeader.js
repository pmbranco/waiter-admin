import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Popover from 'material-ui/Popover'
import { MenuItem, MenuList } from 'material-ui/Menu'
import ArrowDropDown from 'material-ui-icons/ArrowDropDown'
import ArrowDropUp from 'material-ui-icons/ArrowDropUp'
import { ListItemIcon } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

const styles = theme => ({
  hide: {
    display: 'none',
  },
  avatar: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginRight: 21,
    marginBottom: 5,
    marginLeft: 5,
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: theme.palette.grey[300],
    color: '#fff',
    backgroundColor: theme.palette.primary[500],
    fontSize: '0.8rem',
  },
  navLink: {
    textDecoration: 'none',
  },
})

class DrawerHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorElProfileMenu: null,
      openProfileMenu: false,
    }
  }

  handleProfileMenuOpen = () => {
    this.setState({
      openProfileMenu: true,
      anchorElProfileMenu: findDOMNode(this.profileMenu),
    })
  }

  handleProfileMenuClose = () => {
    this.setState({ openProfileMenu: false })
  }

  render() {
    const { classes, theme, openDrawer, userInfo } = this.props
    const { anchorElProfileMenu, openProfileMenu } = this.state
    let nameInitials = userInfo.firstName.charAt(0) + userInfo.lastName.charAt(0)

    return (
      <div>
        <Grid container direction="row" alignItems="center" className={classNames(!openDrawer && classes.hide)}>
          <Grid item>
            <ListItemIcon>
              <Avatar className={classes.avatar}>{nameInitials}</Avatar>
            </ListItemIcon>
          </Grid>
          <Grid item>
            <Grid
              container
              ref={node => {
                this.profileMenu = node
              }}
              onClick={this.handleProfileMenuOpen}
              style={{
                cursor: 'pointer',
              }}
            >
              <Typography type="body2">{userInfo.firstName}</Typography>
              {openProfileMenu ? (
                <ArrowDropUp color={theme.palette.grey[400]} />
              ) : (
                <ArrowDropDown color={theme.palette.grey[400]} />
              )}
            </Grid>
            <Popover
              open={openProfileMenu}
              anchorEl={anchorElProfileMenu}
              anchorreference="anchorEl"
              onRequestClose={this.handleProfileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Paper>
                <MenuList role="menu">
                  <NavLink to={'/profile'} className={classes.navLink}>
                    <MenuItem>My Profile</MenuItem>
                  </NavLink>
                  {/*<MenuItem onClick={this.handleProfileMenuClose}>Logout</MenuItem>*/}
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </MenuList>
              </Paper>
            </Popover>
          </Grid>
        </Grid>
      </div>
    )
  }
}

DrawerHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(DrawerHeader)
