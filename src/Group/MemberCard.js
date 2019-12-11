import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import BangIcon from '@material-ui/icons/PriorityHigh';
import FlagIcon from '@material-ui/icons/Flag';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    padding: 10,
    minWidth: 100,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    height: 60,
    '&::before': {
      content: '""',
      width: 10,
      height: 60,
      margin: '-10px 0px -10px -10px',
      borderRadius: '5px 0px 0px 5px'
    }
  },
  green: {
    '&:before': {
      backgroundColor: theme.palette.statusGreen.main
    }
  },
  red: {
    '&:before': {
      backgroundColor: theme.palette.statusRed.main
    }
  },
  yellow: {
    '&:before': {
      backgroundColor: theme.palette.statusYellow.main
    }
  },
  name: {
    fontWeight: 500
  },
  actions: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
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
  normal: {
    opacity: 1
  },
  actionItem: {
    '&:hover': {
      opacity: 1
    }
  },
  checkbox: {
    marginLeft: 5,
    marginRight: 5
  }
}));

const MemberCard = ({ member, onCheck, checked, status, markAttendance }) => {
  const classes = useStyles();

  const handleMarkAttendance = statusType => {
    markAttendance(member.ID, statusType);
  };

  let classColor;

  switch (status) {
    case '1':
      classColor = classes.green;
      break;
    case '2':
      classColor = classes.red;
      break;
    case '3':
      classColor = classes.yellow;
      break;
    default:
  }

  return (
    <div className={classNames([classes.root, classColor])}>
      <Checkbox
        checked={checked}
        onChange={onCheck(member.ID)}
        value={member.ID}
        color='primary'
        className={classes.checkbox}
      />
      <Typography variant='body2' color='primary' className={classes.name}>
        {member.name}
      </Typography>
      <div className={classes.actions}>
        <IconButton
          className={classNames([
            classes.yellowColor,
            classes.actionItem,
            ...[status === '3' ? classes.normal : classes.lowPacity]
          ])}
          onClick={() => {
            handleMarkAttendance('3');
          }}
        >
          <FlagIcon />
        </IconButton>
        <IconButton
          className={classNames([
            classes.redColor,
            classes.actionItem,
            ...[status === '2' ? classes.normal : classes.lowPacity]
          ])}
          onClick={() => {
            handleMarkAttendance('2');
          }}
        >
          <BangIcon />
        </IconButton>
        <IconButton
          className={classNames([
            classes.greenColor,
            classes.actionItem,
            ...[status === '1' ? classes.normal : classes.lowPacity]
          ])}
          onClick={() => {
            handleMarkAttendance('1');
          }}
        >
          <CheckIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MemberCard;
