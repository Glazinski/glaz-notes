import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTheme } from './store/actions/uiActions';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import myTheme from './utils/theme';
import Notes from './pages/Notes';
import Bin from './pages/Bin';

// React router
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';
import Dashboard from './components/notes/Dashboard';

const App = (props) => {
  const { theme, fetchTheme, auth: { uid } } = props;
  const [prefersDarkMode, setPrefersDarkMode] = useState(theme);

  const MuiTheme = React.useMemo(
    () => myTheme(prefersDarkMode),
    [prefersDarkMode],
  );

  // TODO: Temporary solution
  useEffect(() => history.push('/'), []);

  useEffect(() => {
    if (uid) {
      fetchTheme();
    }
    setPrefersDarkMode(theme);
  }, [props]);

  return (
    <Router history={history}>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        {/* <Home /> */}
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Home {...props}>
                <Notes {...props} />
              </Home>
            )}
          />
          <Route
            path="/bin"
            render={(props) => (
              <Home {...props}>
                <Bin {...props} />
              </Home>
            )}
          />
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
  auth: state.firebase.auth,
});

App.defaultProps = {
  uid: null,
};

App.propTypes = {
  theme: PropTypes.string.isRequired,
  fetchTheme: PropTypes.func.isRequired,
  uid: PropTypes.string,
};

export default connect(mapStateToProps, { fetchTheme })(App);
