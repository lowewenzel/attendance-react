import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import DashboardRoute from './Dashboard/DashboardRoute';
import AttendanceAppBar from './comp/AttendanceAppBar';
import AppContext, { defaultContext } from './AppContext';
import LoginRoute from './Dashboard/LoginRoute';

const useStyles = makeStyles({
  root: {
    padding: 30,
    marginLeft: 88,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0D3B66'
    },
    secondary: {
      main: '#089AEE'
    },
    statusGreen: {
      main: '#2CC36A'
    },
    statusRed: {
      main: '#F1433F'
    },
    statusYellow: {
      main: '#F8BA00'
    }
  },
  typography: {
    fontFamily:
      "Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;"
  }
});

const App = () => {
  const [appState, setAppState] = useState(defaultContext);
  const classes = useStyles();

  return (
    <AppContext.Provider
      value={{
        data: appState,
        setUserState: setAppState
      }}
    >
      <AppContext.Consumer>
        {context => (
          <ThemeProvider theme={theme}>
            <div>
              <AttendanceAppBar />
              <div className={classes.root}>
                <Router>
                  {context.data && context.data.token ? (
                    <Route path='/' component={DashboardRoute} />
                  ) : (
                    <Route path='/' component={LoginRoute} />
                  )}
                </Router>
              </div>
            </div>
          </ThemeProvider>
        )}
      </AppContext.Consumer>
    </AppContext.Provider>
  );
};

export default App;
