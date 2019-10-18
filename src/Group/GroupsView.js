import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
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
    display: 'grid',
    gridTemplateColumns: ' repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    gridColumnGap: '10px',
    gridRowGap: '10px'
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
    transition: '0.5s'
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
    transition: '0.5s'
  }
});

const GroupsView = ({ groups, refresh }) => {
  const classes = useStyles();
  const [showNewGroup, setShowNewGroup] = useState(false);

  const handleClickNewGroup = () => {
    setShowNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setShowNewGroup(false);
    refresh();
  };

  return (
    <Flipper flipKey={showNewGroup}>
      <div className={classes.grid}>
        <Flipped flipId='groups'>
          <div
            className={classes.groups}
            style={{
              gridArea: showNewGroup ? '1 / 1 / 4 / 4' : '1 / 1 / 6 / 6'
            }}
          >
            <div className={classes.header}>
              <Typography
                variant='h4'
                color='primary'
                className={classes.title}
              >
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
              {groups.map(group => (
                <GroupCard
                  key={group.ID}
                  groupName={group.groupName}
                  memberName={group.memberName}
                  groupId={group.ID}
                />
              ))}
            </div>
          </div>
        </Flipped>
        <Flipped flipId='newGroup'>
          <div
            className={classes.newGroup}
            style={{
              gridArea: showNewGroup ? '1 / 4 / 4 / 6' : '0 / 0 / 0 / 0',
              display: showNewGroup ? 'inherit' : 'none',
              width: showNewGroup ? 'initial' : 0
            }}
          >
            {showNewGroup && (
              <GroupNew closeNewGroup={handleCloseNewGroup} refresh={refresh} />
            )}
          </div>
        </Flipped>
      </div>
    </Flipper>
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
