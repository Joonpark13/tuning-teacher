import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Pitch from './Pitch';
import Controls from './Controls';
import { useSynth } from './hooks';
import { HARD_LEFT, HARD_RIGHT } from './constants';

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

const PitchWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

function App() {
  const given = useSynth(440, 'triangle', HARD_LEFT);
  const your = useSynth(450, 'sine', HARD_RIGHT);

  function handlePlayBoth() {
    if (given.isPlaying && your.isPlaying) {
      given.stopPlaying();
      your.stopPlaying();
    } else if (!given.isPlaying && !your.isPlaying) {
      given.startPlaying();
      your.startPlaying();
    } else if (!given.isPlaying) {
      given.startPlaying();
    } else {
      your.startPlaying();
    }
  }

  return (
    <main>
      <AppBar position="sticky">
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

        <PitchWrapper>
          <Pitch title="Given Pitch" {...given} />
          <Pitch title="Your Pitch" {...your} />
        </PitchWrapper>

        <Controls
          isBothPlaying={given.isPlaying && your.isPlaying}
          playBoth={handlePlayBoth}
        />
      </BodyWrapper>
    </main>
  );
}

export default App;
