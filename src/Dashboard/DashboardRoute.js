import React, { useState, useEffect, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { getGroups } from '../apiRequests';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CircularProgress, Button, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link, useLocation, Switch, Route } from 'react-router-dom';

import GroupsView from '../Group/GroupsView';
import GroupView from '../Group/GroupView';
import AppContext from '../AppContext';
import ProfileView from '../Profile/ProfileView';
import MembersView from '../Members/MembersView';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column'
  },
  header: {
    marginTop: 40
  },
  headerLinks: {
    display: 'flex'
  },
  activeSelection: {
    color: theme.palette.secondary.main
  },
  inactiveSelection: {
    color: '#333',
    opacity: 0.4,
    fontWeight: 300,
    '&:hover': {
      opacity: 0.6
    }
  },
  headerLink: {
    transition: '0.15s',
    marginRight: 20,
    textDecoration: 'none'
  },
  dashboardBrowserContainer: {
    marginBottom: 50
  },
  userHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}));

const DashboardView = ({ goBack, goHome, path }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>
      <div className={classes.userHeader}>
        {path !== '/' && (
          <IconButton onClick={goBack}>
            <ChevronLeftIcon />
          </IconButton>
        )}
        <ButtonBase onClick={goHome}>
          <Typography variant='subtitle2' color='primary'>
            DASHBOARD
          </Typography>
        </ButtonBase>
      </div>
      <div className={classes.header}>
        <div className={classes.headerLinks}>
          <Link
            to='/'
            className={`${
              pathname === '/' || pathname === ''
                ? classes.activeSelection
                : classes.inactiveSelection
            } ${classes.headerLink}`}
          >
            <Typography variant='h5'>Groups</Typography>
          </Link>
          <Link
            to='/members'
            className={`${
              pathname === '/members'
                ? classes.activeSelection
                : classes.inactiveSelection
            } ${classes.headerLink}`}
          >
            <Typography variant='h5'>Members</Typography>
          </Link>

          <Link
            to='/profile'
            className={`${
              pathname === '/profile'
                ? classes.activeSelection
                : classes.inactiveSelection
            } ${classes.headerLink}`}
          >
            <Typography variant='h5'>Profile</Typography>
          </Link>
        </div>
      </div>
      <div className={classes.dashboardBrowserContainer}>
        <Switch>
          <Route component={GroupsView} path='/' exact />
          <Route component={ProfileView} path='/profile' exact />
          <Route component={MembersView} path='/members' exact />
          <Route component={GroupView} path='/groups/:groupId' exact />
          <Route component={GroupView} path='/groups/:groupId/:date' exact />
        </Switch>
      </div>
    </div>
  );
};

const DashboardRoute = ({ history, location }) => {
  return (
    <DashboardView
      goBack={history.goBack}
      path={location.pathname}
      goHome={() => {
        history.push('');
      }}
    />
  );
};

export default DashboardRoute;
