import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { PlayArrow, Stop } from '@material-ui/icons';
import Pitch from './Pitch';
import Controls from './Controls';
import { useSynth, usePressAndHold } from './hooks';
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
  margin-bottom: 8px;
`;

const PlayBothButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const given = useSynth(440, 0, 'triangle', HARD_LEFT);
  const your = useSynth(440, 10, 'sine', HARD_RIGHT);
  const [onIncrementPress, onIncrementRelease] = usePressAndHold(() => your.changePitch(0.5));
  const [onDecrementPress, onDecrementRelease] = usePressAndHold(() => your.changePitch(-0.5));

  const isBothPlaying = given.isPlaying && your.isPlaying;

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

        <SectionWrapper>
          <PitchWrapper>
            <Pitch title="Given Pitch" {...given} />
            <Pitch title="Your Pitch" {...your} />
          </PitchWrapper>

          <PlayBothButtonWrapper>
            <Button
              variant="outlined"
              color="primary"
              startIcon={isBothPlaying ? <Stop /> : <PlayArrow />}
              onClick={handlePlayBoth}
            >
              {isBothPlaying ? 'Stop' : 'Play'} Both
            </Button>
          </PlayBothButtonWrapper>
        </SectionWrapper>

        <Controls
          incrementPress={onIncrementPress}
          incrementRelease={onIncrementRelease}
          decrementPress={onDecrementPress}
          decrementRelease={onDecrementRelease}
          pitchControlDisabled={!your.isPlaying}
          onReset={your.resetPitch}
        />
      </BodyWrapper>
    </main>
  );
}

export default App;
