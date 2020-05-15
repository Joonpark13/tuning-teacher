import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { AppBar, Toolbar, Typography, Button, Snackbar, Tabs, Tab, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Home from './Home';
import Settings from './Settings';
import { SettingsContext } from './context';
import { useLocalStorageState } from './hooks';
import { NORTHWESTERN_PURPLE, NORTHWESTERN_PURPLE_10, RICH_BLACK_80 } from './colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: NORTHWESTERN_PURPLE,
    },
    secondary: {
      main: NORTHWESTERN_PURPLE_10,
    },
    text: {
      primary: RICH_BLACK_80,
    },
  },
});

const AppTitle = styled(Typography)`
  flex-grow: 1;
`;

const initialSettings = {
  pitchRange: {
    lower: 'C3',
    upper: 'B4',
  },
};

function App() {
  const [key, setKey] = useState(v4());
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const settingsState = useLocalStorageState(initialSettings, 'settings');

  function handleNewPitch() {
    setKey(v4());
    setSnackbarOpen(true);
  }

  function handleCloseSnackbar(event, reason) {
    if (reason !== 'clickaway') {
      setSnackbarOpen(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <SettingsContext.Provider value={settingsState}>
        <main>
          <AppBar position="sticky">
            <Toolbar>
              <AppTitle variant="h6">
                Tuning Teacher 
              </AppTitle>
              {currentTab === 0 && (
                <Button color="inherit" onClick={handleNewPitch}>
                  New Pitch
                </Button>
              )}
            </Toolbar>

            <Tabs variant="fullWidth" value={currentTab} onChange={(event, value) => setCurrentTab(value)}>
              <Tab label="Home" />
              <Tab label="Settings" />
            </Tabs>
          </AppBar>

          {currentTab === 0 ? (
            <Home key={key} onNewPitch={handleNewPitch} />
          ) : (
            <Settings />
          )}

          <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
            <Alert severity="success">
              New pitch initialized.
            </Alert>
          </Snackbar>
        </main>
      </SettingsContext.Provider>
    </ThemeProvider>
  );
}

export default App;
