import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { AppBar, Toolbar, Typography, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Main from './Main';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  padding: 16px;
`;

function App() {
  const [key, setKey] = useState(v4());
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    <main>
      <AppBar position="sticky">
        <StyledToolbar>
          <Typography variant="h6">
            Tuning Teacher 
          </Typography>
          <Button color="inherit" onClick={handleNewPitch}>
            New Pitch
          </Button>
        </StyledToolbar>
      </AppBar>

      <BodyWrapper>
        <Main key={key} onNewPitch={handleNewPitch} />
      </BodyWrapper>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert severity="success">
          New pitch initialized.
        </Alert>
      </Snackbar>
    </main>
  );
}

export default App;
