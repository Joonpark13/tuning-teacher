import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Card, CardContent, Fab } from '@material-ui/core';

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

function Controls({
  incrementPress,
  incrementRelease,
  decrementPress,
  decrementRelease,
  pitchControlDisabled,
  onReset,
  onSubmit
}) {
  return (
    <Card>
      <CardContent>
        <ControlsWrapper>
          <MiscControlsWrapper>
            <StyledButton variant="outlined" color="primary" onClick={onReset}>
              Reset My Pitch
            </StyledButton>

            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </MiscControlsWrapper>

          <PitchShiftButtonsWrapper>
            <StyledFab
              onMouseDown={incrementPress}
              onMouseUp={incrementRelease}
              onTouchStart={incrementPress}
              onTouchEnd={incrementRelease}
              disabled={pitchControlDisabled}
            >
              ♯
            </StyledFab>
            <Fab
              onMouseDown={decrementPress}
              onMouseUp={decrementRelease}
              onTouchStart={decrementPress}
              onTouchEnd={decrementRelease}
              disabled={pitchControlDisabled}
            >
              ♭
            </Fab>
          </PitchShiftButtonsWrapper>
        </ControlsWrapper>
      </CardContent>
    </Card>
  )
};

Controls.propTypes = {
  incrementPress: PropTypes.func,
  incrementRelease: PropTypes.func,
  decrementPress: PropTypes.func,
  decrementRelease: PropTypes.func,
  pitchControlDisabled: PropTypes.bool,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Controls;
