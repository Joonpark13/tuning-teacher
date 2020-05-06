import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Card, CardContent, Fab } from '@material-ui/core';
import { PlayArrow, Stop } from '@material-ui/icons';

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const PitchShiftButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFab = styled(Fab)`
  margin-bottom: 4px;
`;

const MiscControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-bottom: 12px;
`;

function Controls({ isBothPlaying, playBoth, incrementPitch, decrementPitch, pitchControlDisabled }) {
  return (
    <Card>
      <CardContent>
        <ControlsWrapper>
          <MiscControlsWrapper>
            <StyledButton
              variant="outlined"
              color="primary"
              startIcon={isBothPlaying ? <Stop /> : <PlayArrow />}
              onClick={playBoth}
            >
              {isBothPlaying ? 'Stop' : 'Play'} Both
            </StyledButton>

            <Button variant="contained" color="primary">
              Submit
            </Button>
          </MiscControlsWrapper>

          <PitchShiftButtonsWrapper>
            <StyledFab onClick={incrementPitch} disabled={pitchControlDisabled}>
              ♯
            </StyledFab>
            <Fab onClick={decrementPitch} disabled={pitchControlDisabled}>
              ♭
            </Fab>
          </PitchShiftButtonsWrapper>
        </ControlsWrapper>
      </CardContent>
    </Card>
  )
};

Controls.propTypes = {
  isBothPlaying: PropTypes.bool,
  playBoth: PropTypes.func,
  incrementPitch: PropTypes.func,
  decrementPitch: PropTypes.func,
  pitchControlDisabled: PropTypes.bool,
};

export default Controls;
