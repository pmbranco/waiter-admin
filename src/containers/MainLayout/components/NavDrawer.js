import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'
import HomeIcon from 'material-ui-icons/Home'
import OverviewIcon from 'material-ui-icons/Poll'
import EventsIcon from 'material-ui-icons/Web'
import WaitsIcon from 'material-ui-icons/Memory'
import UserIcon from 'material-ui-icons/People'
// import LogsIcon from 'material-ui-icons/HotTub'
import SettingsIcon from 'material-ui-icons/Settings'
import FeedbackIcon from 'material-ui-icons/Feedback'
import AboutIcon from 'material-ui-icons/Info'
import Avatar from 'material-ui/Avatar'
import 'typeface-roboto'

const styles = theme => ({
  navLink: {
    textDecoration: 'none',
  },
  tabSelected: {
    fill: theme.palette.primary[500],
  },
  hide: {
    display: 'none',
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: -2,
    // borderWidth: '1px',
    // borderStyle: 'solid',
    // borderColor: theme.palette.grey[300],
    color: '#fff',
    backgroundColor: theme.palette.primary[500],
    fontSize: '0.8rem',
  },
})

const tabData = [
  {
    name: 'profile',
    title: 'Profile',
  },
  {
    name: 'home',
    title: 'Home',
  },
  {
    name: 'overview',
    title: 'Overview',
  },
  {
    name: 'events',
    title: 'Events',
  },
  {
    name: 'waits',
    title: 'Waits',
  },
  {
    name: 'user',
    title: 'User',
  },
  // {
  //   name: 'logs',
  //   title: 'Logs',
  // },
  {
    name: 'settings',
    title: 'Settings',
  },
  {
    name: 'feedback',
    title: 'Feedback',
  },
  {
    name: 'about',
    title: 'About',
  },
]

class NavDrawer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: {
        profile: false,
        home: false,
        overview: false,
        events: false,
        waits: false,
        user: false,
        // logs: false,
        settings: false,
        feedback: false,
        about: false,
      },
    }
  }

  changeTab(tab) {
    this.setState({
      selectedTab: {
        [tab]: true,
      },
    })
  }

  render() {
    const { classes, openDrawer, userInfo } = this.props
    const { selectedTab } = this.state
    const tabs = openDrawer === true ? tabData.slice(1, 8) : tabData.slice()
    let nameInitials = userInfo.firstName.charAt(0) + userInfo.lastName.charAt(0)

    return (
      <div>
        <List className={classes.list}>
          {tabs.map((tab, index) => (
            <NavLink
              to={'/' + tab.name}
              className={classes.navLink}
              key={index}
              onClick={() => this.changeTab(tab.name)}
            >
              <Tooltip
                id="tooltip-right"
                title={tab.title}
                placement="right"
                disableTriggerHover={openDrawer}
                disableTriggerTouch={true}
                disableTriggerFocus={true}
              >
                <ListItem button>
                  {tab.name === 'profile' && (
                    <ListItemIcon>
                      <Avatar className={classes.avatar}>{nameInitials}</Avatar>
                    </ListItemIcon>
                  )}
                  {tab.name === 'home' && (
                    <ListItemIcon>
                      <HomeIcon className={selectedTab.home === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  {tab.name === 'overview' && (
                    <ListItemIcon>
                      <OverviewIcon className={selectedTab.overview === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  {tab.name === 'events' && (
                    <ListItemIcon>
                      <EventsIcon className={selectedTab.events === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  {tab.name === 'waits' && (
                    <ListItemIcon>
                      <WaitsIcon className={selectedTab.waits === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  {tab.name === 'user' && (
                    <ListItemIcon>
                      <UserIcon className={selectedTab.user === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  {/*{tab.name === 'logs' && (
                    <ListItemIcon>
                      <LogsIcon className={selectedTab.logs === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}*/}
                  {tab.name === 'settings' && (
                    <ListItemIcon>
                      <SettingsIcon className={selectedTab.settings === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  {tab.name === 'feedback' && (
                    <ListItemIcon>
                      <FeedbackIcon className={selectedTab.feedback === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  {tab.name === 'about' && (
                    <ListItemIcon>
                      <AboutIcon className={selectedTab.about === true && classes.tabSelected} />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    className={classNames(!openDrawer && classes.hide)}
                    disableTypography
                    primary={
                      <Typography type="body2" color={selectedTab[tab.name] === true ? 'primary' : 'default'}>
                        {' '}
                        {tab.title}{' '}
                      </Typography>
                    }
                  />
                </ListItem>
              </Tooltip>
              {tab.name === 'profile' && <Divider />}
              {tab.name === 'user' && <Divider />}
            </NavLink>
          ))}
        </List>
      </div>
    )
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavDrawer)
