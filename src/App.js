import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import myTheme from './theme/theme';
import Notes from './pages/Notes';
import Bin from './pages/Bin';
import Archive from './pages/Archive';
import AnyLabel from './pages/AnyLabel';
import darkColors from './theme/darkColors';
import lightColors from './theme/lightColors';
import { fetchUserUi, setColors } from './store/ui/actions';
import { fetchLabels } from './store/labels/actions';
import PrivateRoute from './lib/router/PrivateRoute';
import history from './lib/router/history';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const { uid } = useSelector((state) => state.firebase.auth);
  const [prefersDarkMode, setPrefersDarkMode] = useState(theme);

  const MuiTheme = React.useMemo(
    () => myTheme(prefersDarkMode),
    [prefersDarkMode]
  );

  const handleTheme = () => {
    setPrefersDarkMode(theme);
    if (theme === 'dark') {
      dispatch(setColors(darkColors));
      return;
    }

    dispatch(setColors(lightColors));
  };

  useEffect(() => {
    if (uid) {
      dispatch(fetchUserUi());
      dispatch(fetchLabels());
    }

    handleTheme();
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

export default App;
