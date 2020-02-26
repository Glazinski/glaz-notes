import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import myTheme from './utils/theme';

import SignIn from './components/auth/SignIn';

const App = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState('dark');
  const onClick = () => setPrefersDarkMode(prefersDarkMode === 'dark' ? 'light' : 'dark');

  const theme = React.useMemo(
    () => myTheme(prefersDarkMode),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <button type="button" onClick={onClick}>TEST</button>
        <div className="App">
          <SignIn />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
