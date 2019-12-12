import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonBase from '@material-ui/core/ButtonBase';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import BangIcon from '@material-ui/icons/PriorityHigh';
import FlagIcon from '@material-ui/icons/Flag';
import {
  getGroup,
  getAttendance,
  putAttendance,
  putBulk
} from '../apiRequests';
import AppContext from '../AppContext';
import MemberCard from './MemberCard';
import { getDayAsFormatted } from '../helpers';
import MemberNew from './MemberNew';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column'
  },
  header: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'space-between'
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 40
  },
  addMemberButton: {
    marginLeft: 'auto'
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start'
  },
  membersContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start',
    flex: 1
  },
  newMemberContainer: {
    background: '#fff',
    padding: '40px 80px',
    marginLeft: 10,
    borderRadius: 10
  },
  yellowColor: {
    color: theme.palette.statusYellow.main
  },
  redColor: {
    color: theme.palette.statusRed.main
  },
  greenColor: {
    color: theme.palette.statusGreen.main
  },
  lowPacity: {
    opacity: 0.3
  },

  actionItem: {
    '&:hover': {
      opacity: 1
    }
  },
  bulkActionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
    marginBottom: 10
  },
  checkbox: {
    marginRight: 'auto',
    marginLeft: 15
  },
  buttonBase: {
    padding: 10,
    marginBottom: 10
  }
}));

const GroupView = ({
  group,
  loading,
  error,
  date,
  attendance,
  markAttendance,
  bulkAttendance,
  refresh,
  history
}) => {
  const classes = useStyles();
  const [checkedMemberIds, setChecked] = useState(new Set([]));
  const [newMemberOpen, setNewMemberOpen] = useState(false);
  const [gardenDate, setDate] = useState(date.toDate());

  const isAllSelected = checkedMemberIds.size === group.members.length;

  const onCheck = name => e => {
    const newSet = new Set(checkedMemberIds);
    checkedMemberIds.has(name) ? newSet.delete(name) : newSet.add(name);

    setChecked(newSet);
  };

  const numMembers = group.members.length;

  const closeNewMember = () => {
    refresh();
    setNewMemberOpen(false);
  };

  const openNewMember = () => {
    setNewMemberOpen(true);
  };

  const handleBulkAttendance = useCallback(
    status => {
      checkedMemberIds.size === 0
        ? bulkAttendance(
            group.members.map(member => member.ID),
            status
          )
        : bulkAttendance(Array.from(checkedMemberIds), status);
    },
    [bulkAttendance, checkedMemberIds, group.members]
  );

  const selectAll = useCallback(() => {
    isAllSelected
      ? setChecked(new Set([]))
      : setChecked(new Set(group.members.map(member => member.ID)));
  }, [group.members, isAllSelected]);

  const goToDate = newDate => {
    setDate(newDate);
    const urlArray = history.location.pathname.split('/');
    history.push(
      `${urlArray.slice(0, 3).join('/')}/${moment(newDate).format('YYYYMMDD')}`
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Typography variant='h3' color='primary'>
            {group.groupName}
          </Typography>
          <Typography variant='h6' color='primary'>
            {numMembers} {group.memberName}
          </Typography>
        </div>
        <div className={classes.dateContainer}>
          <DatePicker
            selected={gardenDate}
            onChange={goToDate}
            customInput={
              <ButtonBase className={classes.buttonBase}>
                <Typography variant='h3' color='secondary'>
                  {date.format('MMM Do YYYY')}
                </Typography>
              </ButtonBase>
            }
          />
        </div>
      </div>
      <div className={classes.actionsContainer}>
        <Button
          onClick={openNewMember}
          disabled={newMemberOpen}
          variant='outlined'
          color='primary'
          className={classes.addMemberButton}
        >
          Add Member
        </Button>
      </div>
      <div className={classes.bulkActionsContainer}>
        <Checkbox
          checked={isAllSelected}
          onChange={selectAll}
          color='primary'
          className={classes.checkbox}
        />
        <Typography variant='caption' style={{ color: '#999', marginRight: 5 }}>
          {checkedMemberIds.size > 0 ? 'Mark Selected' : 'Mark All'}
        </Typography>
        <IconButton
          className={classNames([
            classes.yellowColor,
            classes.actionItem,
            classes.lowPacity
          ])}
          onClick={() => {
            handleBulkAttendance('3');
          }}
        >
          <FlagIcon />
        </IconButton>
        <IconButton
          className={classNames([
            classes.redColor,
            classes.actionItem,
            classes.lowPacity
          ])}
          onClick={() => {
            handleBulkAttendance('2');
          }}
        >
          <BangIcon />
        </IconButton>
        <IconButton
          className={classNames([
            classes.greenColor,
            classes.actionItem,
            classes.lowPacity
          ])}
          onClick={() => {
            handleBulkAttendance('1');
          }}
        >
          <CheckIcon />
        </IconButton>
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.membersContainer}>
          {group.members.map(member => (
            <MemberCard
              key={member.ID}
              member={member}
              onCheck={onCheck}
              checked={checkedMemberIds.has(member.ID)}
              status={attendance.ids[member.ID]}
              markAttendance={markAttendance}
            />
          ))}
        </div>
        {newMemberOpen && (
          <div className={classes.newMemberContainer}>
            <MemberNew
              closeNewMember={closeNewMember}
              memberName={group.memberName}
              groupId={group.ID}
              refresh={refresh}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const GroupViewWithData = ({ history }) => {
  const context = useContext(AppContext);
  const [group, setGroup] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { groupId, date } = useParams();

  let newDate, formattedNewDate;

  if (!(date && date.length > 0)) {
    newDate = moment();
    formattedNewDate = newDate.format('YYYYMMDD');
  } else {
    newDate = moment(date, 'YYYYMMDD');
    formattedNewDate = date;
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const bulkAttendance = async (memberIds, status) => {
    // Lazy loading :-)
    const original = { ...attendance };
    const lazyAttendance = {
      ...attendance,
      ids: {
        ...attendance.ids,
        ...memberIds.reduce((obj, nextId) => ({ ...obj, [nextId]: status }), {})
      }
    };

    setAttendance(lazyAttendance);

    try {
      const res = await putBulk(
        groupId,
        formattedNewDate,
        memberIds,
        status,
        context.data.token
      );
      const newAttendance = {
        ...attendance,
        ids: {
          ...attendance.ids,
          ...res.results.map(result => ({
            [result.memberId]: result.statusType
          }))
        }
      };
      setAttendance(newAttendance);
      //yay
    } catch (err) {
      setError([...error, err.response].join('. '));
      setAttendance(original);
    }
  };

  const markAttendance = async (memberId, status) => {
    // Lazy loading :-)
    const originalStatus = attendance.ids[memberId];
    const lazyAttendance = {
      ...attendance,
      ids: {
        ...attendance.ids,
        [memberId]: status
      }
    };

    setAttendance(lazyAttendance);

    try {
      const res = await putAttendance(
        groupId,
        formattedNewDate,
        memberId,
        status,
        context.data.token
      );
      const newAttendance = {
        ...attendance,
        ids: {
          ...attendance.ids,
          [memberId]: res.statusType
        }
      };
      setAttendance(newAttendance);
      //yay
    } catch (err) {
      console.error(err.response);
      setError([...error, err.response].join('. '));
      const originalAttendance = {
        ...attendance,
        ids: {
          ...attendance.ids,
          [memberId]: originalStatus
        }
      };
      setAttendance(originalAttendance);
    }
  };

  const refreshGroup = useCallback(async () => {
    // setLoading(true);
    try {
      const res = await getGroup(groupId, context.data.token);
      const attendanceData = await getAttendance(
        groupId,
        formattedNewDate,
        context.data.token
      );
      setLoading(false);
      setGroup(res);
      setAttendance(attendanceData);
    } catch (err) {
      setLoading(false);
      console.error(err.response);
      setError([...error, err.response].join('. '));
    }
  }, [context.data.token, error, formattedNewDate, groupId]);

  useEffect(() => {
    refreshGroup();
    setLoaded(true);
  }, [refreshGroup, loaded, date]);

  return !loading && group && attendance ? (
    <GroupView
      group={group}
      loading={loading}
      error={error}
      date={newDate}
      attendance={attendance}
      bulkAttendance={bulkAttendance}
      markAttendance={markAttendance}
      refresh={refreshGroup}
      history={history}
    />
  ) : (
    <CircularProgress color='primary' />
  );
};

export default GroupViewWithData;
