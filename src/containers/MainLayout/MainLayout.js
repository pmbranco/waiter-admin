import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import NavDrawer from './components/NavDrawer'
import DrawerHeader from './components/DrawerHeader'

const openDrawerWidth = 240
const closedDrawerWidth = 60

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logo: {
    height: 35,
    marginBottom: 5,
  },
  miniAppBarShift: {
    marginLeft: closedDrawerWidth,
    width: `calc(100% - ${closedDrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShift: {
    marginLeft: openDrawerWidth,
    width: `calc(100% - ${openDrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    height: '100%',
    width: openDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: closedDrawerWidth,
    overflow: 'visible', // Important: needed for the tooltip to work correctly (overflow, tooltip hidden, etc)
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
})

class MainLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openDrawer: false,
      loggedIn: false,
      userInfo: {},
    }
  }

  handleDrawerOpen = () => {
    this.setState({ openDrawer: true })
  }

  handleDrawerClose = () => {
    this.setState({ openDrawer: false })
  }

  componentWillMount = () => {
    this.setState({ loggedIn: true })
    this.setState({
      userInfo: {
        email: 'samuel@waiter-event.xyz',
        fullName: 'Samuel Joset',
        firstName: 'Samuel',
        lastName: 'Joset',
      },
    })
  }

  render() {
    const { classes, theme } = this.props
    const { openDrawer, userInfo } = this.state

    if (this.state.loggedIn) {
      return (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar, openDrawer && classes.appBarShift)}>
              <Toolbar disableGutters={!openDrawer}>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, openDrawer && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                  Waiter
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              type="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
              }}
              open={openDrawer}
            >
              <div
                style={{
                  width: openDrawer ? openDrawerWidth + 'px' : closedDrawerWidth + 'px',
                }}
              >
                <div className={classes.drawerHeader}>
                  <DrawerHeader openDrawer={openDrawer} userInfo={userInfo} />
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <Divider />
                <NavDrawer openDrawer={openDrawer} userInfo={userInfo} />
              </div>
            </Drawer>
            <main
              className={classNames(
                classes.content,
                openDrawer && classes.appBarShift,
                !openDrawer && classes.miniAppBarShift
              )}
            >
              {this.props.children}
            </main>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MainLayout)
