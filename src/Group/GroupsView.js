import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Flipper, Flipped } from 'react-flip-toolkit';

import { getGroups } from '../apiRequests';
import AppContext from '../AppContext';

import GroupCard from './GroupCard';
import GroupNew from './GroupNew';

const useStyles = makeStyles({
  grid: {
    marginTop: 40,
    display: 'flex'
  },
  header: {
    display: 'flex'
  },
  title: {
    marginRight: 'auto'
  },
  addButton: {},
  hr: { width: '40%', marginRight: 'auto', marginLeft: 0, opacity: 0.25 },
  groups: {
    background: '#fff',
    padding: 60,
    borderRadius: 5,
    transition: '0.5s',
    flex: 1
  },
  groupsContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40
    // '&:after': {
    //   content: '""',
    //   width: 200
    // }
  },
  newGroup: {
    background: '#fff',
    padding: 60,
    borderRadius: 5,
    transition: '0.5s',
    minWidth: 500,
    marginLeft: 20
  }
});

const GroupsView = ({ groups, refresh }) => {
  const classes = useStyles();
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [transitionIn, setTransitionIn] = useState(false);

  const handleClickNewGroup = () => {
    setShowNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setShowNewGroup(false);
    refresh();
  };

  useEffect(() => {
    setTimeout(() => {
      setTransitionIn(true);
    }, 10000);
  }, []);

  return (
    <div className={classes.grid}>
      <div className={classes.groups}>
        <div className={classes.header}>
          <Typography variant='h4' color='primary' className={classes.title}>
            Your Groups
          </Typography>
          <Button
            color='secondary'
            variant='outlined'
            className={classes.addButton}
            onClick={handleClickNewGroup}
          >
            +
          </Button>
        </div>
        <hr className={classes.hr} />
        <div className={classes.groupsContainer}>
          {groups.map((group, i) => (
            <Grow
              in={transitionIn}
              key={`group-${group.ID}`}
              // mountOnEnter
              // style={{
              //   transformOrigin: '0 0 0',
              //   transitionDelay: `${2 * i * 100}ms`
              // }}
              // timeout={'1600'}
            >
              <GroupCard
                groupName={group.groupName}
                memberName={group.memberName}
                groupId={group.ID}
              />
            </Grow>
          ))}
        </div>
      </div>
      {showNewGroup && (
        <Grow in={showNewGroup}>
          <div className={classes.newGroup}>
            <GroupNew closeNewGroup={handleCloseNewGroup} refresh={refresh} />
          </div>
        </Grow>
      )}
    </div>
  );
};

const GroupsViewWithData = () => {
  const [groups, setGroups] = useState([]);
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCall = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getGroups(context.data.token);
      setGroups(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [context.data.token]);

  useEffect(() => {
    getCall();
  }, [getCall]);

  return (
    <GroupsView
      groups={groups}
      loading={loading}
      error={error}
      refresh={getCall}
    />
  );
};

export default GroupsViewWithData;
