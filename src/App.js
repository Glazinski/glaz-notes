import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTheme } from './store/actions/uiActions';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import myTheme from './utils/theme';

// React router
import {
  Router, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';
import Dashboard from './components/notes/Dashboard';

const App = ({ theme, fetchTheme }) => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(theme);

  const MuiTheme = React.useMemo(
    () => myTheme(prefersDarkMode),
    [prefersDarkMode],
  );

  useEffect(() => {
    fetchTheme();
    setPrefersDarkMode(theme);
  }, [theme]);

  return (
    <Router history={history}>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        {/* <div>
          <div>
            <SignIn />
          </div>
        </div> */}
        {/* <button type="button" onClick={onClick}>TEST</button> */}
        <Home />
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <PrivateRoute path="/login" component={SignIn} />
          <PrivateRoute path="/signup" component={SignUp} />
          <Redirect to="/" />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

App.propTypes = {
  theme: PropTypes.string.isRequired,
  fetchTheme: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchTheme })(App);
