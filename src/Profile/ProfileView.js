import React, { useState, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import AppContext from '../AppContext';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  profileView: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: 5,
    padding: 60,
    flex: 1,
    marginTop: 40
  },
  hr: { width: '40%', marginRight: 'auto', marginLeft: 0, opacity: 0.25 },
  profileInfo: {
    marginTop: 40,
  },
  changeText: {
    color: "#999",
    cursor: 'pointer'
  }
});


const ProfileView = ({ userEmail }) => {
  const classes = useStyles();
  const [userState, setUserState] = useState({ email: userEmail })
  const [isChangeEmail, setIsChangeEmail] = useState(false)

  const onChange = name => event => {
    setUserState({
      ...userState,
      [name]: event.target.value
    });
  };

  const handleChangeEmailClick = useCallback(() => { setIsChangeEmail(true) })

  return (
    <div className={classes.profileView}>
      <div className={classes.userHeader}>
        <Typography variant='h4' color='primary' className={classes.title}>
          My Profile
        </Typography>
      </div>
      <hr className={classes.hr} />
      <div className={classes.profileInfo}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>Email</Typography>
        {
          isChangeEmail ?
            <div className={classes.emailField}>
              <TextField label="Email Address" variant="outlined" value={userState.email} onChange={onChange('email')} />
            </div>
            :
            <Typography><b>{userEmail}</b> <Typography variant="caption" className={classes.changeText} onClick={handleChangeEmailClick}>(change email)</Typography></Typography>
        }
      </div>
    </div>
  )
}

const ProfileViewWithData = () => {
  const context = useContext(AppContext);

  const { email } = context.data;

  return (
    <ProfileView userEmail={email} />
  )
}


export default ProfileViewWithData;