import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import myTheme from './utils/theme';

// React router
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';
import Dashboard from './components/notes/Dashboard';

const App = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState('light');
  const onClick = () => setPrefersDarkMode(prefersDarkMode === 'dark' ? 'light' : 'dark');

  const theme = React.useMemo(
    () => myTheme(prefersDarkMode),
    [prefersDarkMode],
  );

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <div>
          <div>
            <SignIn />
          </div>
        </div> */}
        {/* <button type="button" onClick={onClick}>TEST</button> */}

        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/login" component={SignIn} />
          <PrivateRoute path="/signup" component={SignUp} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
