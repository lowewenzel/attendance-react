import React, { useState, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';

import { postMember } from '../apiRequests';
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

const defaultState = {
  name: '',
  preferredName: ''
};

const MemberNew = ({ refresh, closeNewMember, memberName, groupId }) => {
  const classes = useStyles();
  const [memberState, setMemberState] = useState(defaultState);
  const firstInput = useRef(null);
  const [error, setError] = useState(null);
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(null);

  const onChange = name => event => {
    setMemberState({
      ...memberState,
      [name]: event.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    try {
      await postMember(memberState, groupId, context.data.token);
      refresh();
      setMemberState(defaultState);
      setLoading(false);
      firstInput.current.focus();
      // closeNewMember(); // also handles refresh
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
          New {memberName}
        </Typography>
        <IconButton onClick={closeNewMember}>
          <CloseIcon />
        </IconButton>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl className={classes.tf}>
          <TextField
            disabled={loading}
            label='Name'
            variant='outlined'
            margin='normal'
            min='4'
            max='24'
            onChange={onChange('name')}
            value={memberState.name}
            inputRef={firstInput}
            placeholder='Robert Table'
            InputProps={{
              min: 4,
              max: 24,
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle
                    className={classes.iconAdornment}
                    color={memberState.name.length > 0 ? 'primary' : 'disabled'}
                  />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <FormControl className={classes.tf}>
          <TextField
            disabled={loading}
            label='Preferred Name (optional)'
            variant='outlined'
            margin='normal'
            onChange={onChange('preferredName')}
            value={memberState.preferredName}
            placeholder='Bobby Tables'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle
                    className={classes.iconAdornment}
                    color={
                      memberState.preferredName.length > 0
                        ? 'primary'
                        : 'disabled'
                    }
                  />
                </InputAdornment>
              )
            }}
          />
        </FormControl>
        <Typography margin='normal' color='error' variant='body1'>
          {error}
        </Typography>
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

export default MemberNew;
