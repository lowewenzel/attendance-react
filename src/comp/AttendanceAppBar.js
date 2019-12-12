import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';

import logo from '../img/logo.png';
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
  buttons: { marginLeft: 'auto' },
  img: {
    width: 32,
    height: 32
  },
  '@media (max-width:768px)': {
    root: {
      height: 64,
      maxWidth: '100vw',
      display: 'flex',
      flexFlow: 'row',
      padding: '5px',
      textAlign: 'initial',
      justifyContent: 'center'
    }
  }
});

const AttendanceAppBar = ({}) => {
  const classes = useStyles();
  const history = useHistory();

  const goHome = useCallback(() => history.push('/'), [history]);

  return (
    <AppBar
      position='fixed'
      color='#fff'
      className={classes.root}
      elevation={1}
    >
      <div className={classes.itemContainer}>
        <IconButton onClick={goHome}>
          <img src={logo} className={classes.img} />
        </IconButton>
      </div>

      {/* <div>
        <IconButton
          onClick={() => {
            // loginCookie();
          }}
        >
          <FaceIcon style={{ color: '#fff' }} />
        </IconButton>
      </div> */}
      {/* <div className={classes.buttons}>
          <Button label='Groups' />
        </div> */}
    </AppBar>
  );
};

export default AttendanceAppBar;
