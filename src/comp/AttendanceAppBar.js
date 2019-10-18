import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
// import { loginCookie } from '../apiRequests';

const useStyles = makeStyles({
  root: {
    left: 0,
    height: ' 100vh',
    maxWidth: 88,
    display: 'flex',
    flexFlow: 'column',
    padding: '30px 0px',
    textAlign: 'center'
  },
  itemContainer: {
    marginBottom: 'auto'
  },
  buttons: { marginLeft: 'auto' }
});

const AttendanceAppBar = ({}) => {
  const classes = useStyles();

  return (
    <AppBar
      position='fixed'
      color='#fff'
      className={classes.root}
      elevation={1}
    >
      <div className={classes.itemContainer}>
        <IconButton>
          <DoneIcon color='primary' />
        </IconButton>
      </div>

      <div>
        <IconButton
          onClick={() => {
            // loginCookie();
          }}
        >
          <FaceIcon style={{ color: '#fff' }} />
        </IconButton>
      </div>
      {/* <div className={classes.buttons}>
          <Button label='Groups' />
        </div> */}
    </AppBar>
  );
};

export default AttendanceAppBar;
