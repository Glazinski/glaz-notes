import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLabels } from './store/actions/labelsActions';
import {
  fetchUserUi, setColors,
} from './store/actions/uiActions';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import myTheme from './utils/theme';
import Notes from './pages/Notes';
import Bin from './pages/Bin';
import Archive from './pages/Archive';
import AnyLabel from './pages/AnyLabel';
import darkColors from './utils/darkColors';
import lightColors from './utils/lightColors';

// React router
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import history from './utils/history';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';

const App = (props) => {
  const {
    theme,
    fetchUserUi,
    setColors,
    fetchLabels,
    auth: { uid },
  } = props;
  const [prefersDarkMode, setPrefersDarkMode] = useState(theme);

  const MuiTheme = React.useMemo(
    () => myTheme(prefersDarkMode),
    [prefersDarkMode],
  );

  useEffect(() => {
    if (uid) {
      fetchUserUi();
      fetchLabels();
    }

    if (theme === 'dark') {
      setColors(darkColors);
    } else {
      setColors(lightColors);
    }

    setPrefersDarkMode(theme);
  }, [uid, theme]);

  return (
    <Router history={history}>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline />
        {/* <Home /> */}
        <Switch>
          <Route
            path="/"
            exact
            render={(routerProps) => (
              <Home {...routerProps}>
                <Notes {...routerProps} />
              </Home>
            )}
          />
          <Route
            path="/bin"
            render={(routerProps) => (
              <Home {...routerProps}>
                <Bin {...routerProps} />
              </Home>
            )}
          />
          <Route
            path="/archive"
            render={(routerProps) => (
              <Home {...routerProps}>
                <Archive {...routerProps} />
              </Home>
            )}
          />

          <Route
            path="/label/:labelId"
            render={(routerProps) => (
              <Home {...routerProps}>
                <AnyLabel {...routerProps} />
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
  auth: null,
};

App.propTypes = {
  theme: PropTypes.string.isRequired,
  fetchUserUi: PropTypes.func.isRequired,
  setColors: PropTypes.func.isRequired,
  fetchLabels: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object]),
};

export default connect(mapStateToProps, {
  setColors,
  fetchLabels,
  fetchUserUi,
})(App);
