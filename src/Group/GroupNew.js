import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';

import { postGroup } from '../apiRequests';
import { Button } from '@material-ui/core';
import AppContext from '../AppContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column'
  },
  header: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  },
  tf: {
    width: '100%'
  },
  form: {
    display: 'flex',
    flexFlow: 'column',
    flex: 1
  },
  submitButton: {
    marginTop: 'auto',
    marginLeft: 'auto'
  }
});

const GroupNew = ({ closeNewGroup }) => {
  const classes = useStyles();
  const [groupState, setGroupState] = useState({
    groupName: '',
    memberName: ''
  });
  const [error, setError] = useState(null);
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(null);

  const onChange = name => event => {
    setGroupState({
      ...groupState,
      [name]: event.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    try {
      await postGroup(groupState, context.data.token);
      setLoading(false);
      closeNewGroup(); // also handles refresh
    } catch (err) {
      setLoading(false);
      console.error(err.response);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Hmm, there was an error. Please try again.');
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant='h4' color='primary'>
          New Group
        </Typography>
        <IconButton onClick={closeNewGroup}>
          <CloseIcon />
        </IconButton>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl className={classes.tf}>
          <TextField
            disabled={loading}
            label='Group Name'
            variant='outlined'
            margin='normal'
            min='4'
            max='24'
            onChange={onChange('groupName')}
            placeholder='BIO 233 1:00PM, Ping Pong Fridays, etc.'
            InputProps={{
              min: 4,
              max: 24,
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle
                    className={classes.iconAdornment}
                    color={
                      groupState.groupName.length > 0 ? 'primary' : 'disabled'
                    }
                  />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <FormControl className={classes.tf}>
          <TextField
            disabled={loading}
            label='Member Name (plural)'
            variant='outlined'
            margin='normal'
            onChange={onChange('memberName')}
            placeholder='Try something like Students, Champions, Coders, etc.'
            InputProps={{
              min: 4,
              max: 24,
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle
                    className={classes.iconAdornment}
                    color={
                      groupState.memberName.length > 0 ? 'primary' : 'disabled'
                    }
                  />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <Typography margin='normal' color='error' variant='body1'></Typography>
        <Button
          disabled={loading}
          type='submit'
          variant='outlined'
          className={classes.submitButton}
          color='primary'
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default GroupNew;
