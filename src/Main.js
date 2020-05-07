import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import { PlayArrow, Stop } from '@material-ui/icons';
import Pitch from './Pitch';
import Controls from './Controls';
import ResultDialog from './ResultDialog';
import { useSynth, usePressAndHold } from './hooks';
import { HARD_LEFT, HARD_RIGHT, NOTES } from './constants';

const SectionWrapper = styled.section`
  margin-bottom: 16px;
`;

const InstructionWrapper = styled.div`
  display: flex;
  justify-content: center;
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

const MaxWidthWrapper = styled.div`
  max-width: 600px;
  margin: auto;
`;

function Main({ onNewPitch }) {
  const initialPitch = NOTES[Math.floor(Math.random() * NOTES.length)];
  const randomOffset = Math.floor(Math.random() * 150) - 75; // up to 75 cents above or below the initial pitch
  const given = useSynth(initialPitch, 0, 'triangle', HARD_LEFT);
  const your = useSynth(initialPitch, randomOffset, 'sine', HARD_RIGHT);
  const [onIncrementPress, onIncrementRelease] = usePressAndHold(() => your.changePitch(0.1));
  const [onDecrementPress, onDecrementRelease] = usePressAndHold(() => your.changePitch(-0.1));
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);

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

  function handleSubmit() {
    setIsResultDialogOpen(true);
    if (given.isPlaying) {
      given.stopPlaying();
    }
    if (your.isPlaying) {
      your.stopPlaying();
    }
  }

  return (
    <div>
      <SectionWrapper>
        <InstructionWrapper>
          <Typography variant="body2">
            Nudge <strong>your pitch</strong> (right ear) to match the <strong>given pitch</strong> (left ear), then press submit to see how close you were.
          </Typography>
        </InstructionWrapper>
      </SectionWrapper>

      <MaxWidthWrapper>
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
          onSubmit={handleSubmit}
        />
      </MaxWidthWrapper>

      <ResultDialog
        open={isResultDialogOpen}
        onClose={() => setIsResultDialogOpen(false)}
        centsOff={your.currentOffset}
        onNewPitch={onNewPitch}
      />
    </div>
  );
}

Main.propTypes = {
  onNewPitch: PropTypes.func,
};

export default Main;
