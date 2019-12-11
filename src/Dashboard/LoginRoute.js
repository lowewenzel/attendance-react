import React, { useState, useContext, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Particles from 'react-particles-js';
import AppContext from '../AppContext';
import { postLogin, postSignup } from '../apiRequests';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 60px)',
    width: 'calc(100vw - 60px)'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  signUpButton: {
    marginBottom: 40,
    fontSize: '0.75em',
    color: '#222',
    cursor: 'pointer',
    width: 'max-content'
  },
  form: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    flex: 1
  },
  paper: {
    padding: 50,
    width: 400,
    minHeight: 350,
    boxShadow: '0 1px 1px rgba(0,0,0,0.25)',
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column'
  },
  tf: {
    width: '100%'
  },
  iconAdornment: {
    transition: '0.5s'
  },
  hiddenContainer: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  submit: {
    width: '100%',
    marginTop: 'auto'
  }
});

const LoginView = ({
  isLogin,
  handleSubmit,
  toggleLogin,
  loginError,
  loading
}) => {
  const classes = useStyles();
  const [loginState, setLoginInfo] = useState({ email: '', password: '' });
  const theme = useTheme();

  const onChange = name => event => {
    setLoginInfo({
      ...loginState,
      [name]: event.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(loginState);
  };

  const getButtonLabel = useMemo(() => {
    if (loading) {
      return <CircularProgress color='primary' />;
    } else {
      return isLogin ? 'Log in' : 'Sign up';
    }
  }, [loading, isLogin]);

  return (
    <div className={classes.root}>
      {/* <div className={classes.background}> */}
      <Particles
        className={classes.background}
        params={{
          particles: {
            number: {
              value: 100,
              density: {
                value_area: 1500
              }
            },
            color: {
              value: theme.palette.primary.main
            },
            shape: {
              type: 'edge'
            },
            line_linked: {
              enable: true,
              opacity: 0.2,
              color: theme.palette.primary.main
            },
            move: {
              direction: 'right',
              speed: 0.4
            },
            size: {
              value: 2
            }
          }
        }}
      />
      <Paper className={classes.paper} elevation={15}>
        <Typography variant='h5' color='primary'>
          {isLogin ? 'Log in to your account' : 'Sign up for an account'}
        </Typography>
        <Typography
          variant='subtitle2'
          className={classes.signUpButton}
          onClick={() => toggleLogin()}
          onKeyDown={event => {
            if (event.key === 32 || event.key === 13) toggleLogin();
          }}
          tabIndex='0'
          role='button'
        >
          {isLogin
            ? "Don't have an account? Click here to sign up."
            : 'Have an account? Click here to login.'}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            disabled={loading}
            className={classes.tf}
            label='Email Address'
            onChange={onChange('email')}
            value={loginState.email}
            margin='normal'
            variant='outlined'
            type='email'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle
                    className={classes.iconAdornment}
                    color={loginState.email.length > 0 ? 'primary' : 'disabled'}
                  />
                </InputAdornment>
              )
            }}
          />
          {loginState.email.length > 0 && (
            <Slide direction='up' in={true} timeout={500}>
              <div className={classes.hiddenContainer}>
                <TextField
                  disabled={loading}
                  className={classes.tf}
                  label='Password'
                  type='password'
                  onChange={onChange('password')}
                  value={loginState.password}
                  margin='normal'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <LockIcon
                          className={classes.iconAdornment}
                          color={
                            loginState.password.length > 0
                              ? 'primary'
                              : 'disabled'
                          }
                        />
                      </InputAdornment>
                    )
                  }}
                />
                <Typography variant='caption' color='error'>
                  {loginError}
                </Typography>

                <Button
                  disabled={loading}
                  className={classes.submit}
                  variant='outlined'
                  color='primary'
                  type='submit'
                >
                  {getButtonLabel}
                </Button>
              </div>
            </Slide>
          )}
        </form>
      </Paper>
    </div>
  );
};

const LoginRoute = () => {
  const context = useContext(AppContext);
  const [isLogin, toggleLogin] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = isLogin
        ? await postLogin({ email, password })
        : await postSignup({ email, password });
      context.setUserState({ ...context.data, token, email });
    } catch (err) {
      console.error(err.response);
      if (err.response && err.response.data && err.response.data.message) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError('Hmm, there was an error. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <LoginView
      isLogin={isLogin}
      toggleLogin={() => {
        toggleLogin(!isLogin);
      }}
      handleSubmit={handleSubmit}
      loginError={loginError}
      loading={loading}
    />
  );
};

export default LoginRoute;
