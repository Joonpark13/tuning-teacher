import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import GivenPitch from './GivenPitch';
import YourPitch from './YourPitch';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const BodyWrapper = styled.div`
  padding: 16px;
`;

const SectionWrapper = styled.section`
  margin-bottom: 16px;
`;

function App() {

  return (
    <main>
      <AppBar position="static">
        <StyledToolbar>
          <Typography variant="h6">
            Tuning Teacher 
          </Typography>
          <Button color="inherit">New Pitch</Button>
        </StyledToolbar>
      </AppBar>
      <BodyWrapper>
        <SectionWrapper>
          <Typography variant="body2">
            Nudge <strong>your pitch</strong> (right ear) to match the <strong>given pitch</strong> (left ear), then press submit to see how close you were.
          </Typography>
        </SectionWrapper>

        <SectionWrapper>
          <GivenPitch pitch={440} />
        </SectionWrapper>

        <SectionWrapper>
          <YourPitch />
        </SectionWrapper>
      </BodyWrapper>
    </main>
  );
}

export default App;
