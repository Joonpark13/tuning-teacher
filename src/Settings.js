import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Typography, TextField, Divider, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import SettingsSection from './SettingsSection';
import { SettingsContext } from './context';
import { NOTES } from './constants';

const PitchRangeDescription = styled(Typography)`
  margin-bottom: 8px;
  display: block;
`;

const PitchRangeContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PitchRangeInput = styled(TextField)`
  width: 100px;
`;

function pitchRangeIsValid(lower, upper) {
  const lowerIndex = NOTES.indexOf(lower);
  const upperIndex = NOTES.indexOf(upper);
  return lowerIndex < upperIndex;
}

function isLowerPitchValid(lower, upper) {
  return NOTES.includes(lower) && pitchRangeIsValid(lower, upper);
}

function isUpperPitchValid(lower, upper) {
  return NOTES.includes(upper) && pitchRangeIsValid(lower, upper);
}

function getLowerErrorText(lower, upper) {
  if (!NOTES.includes(lower)) {
    return 'Must be a valid note.';
  }
  if (!pitchRangeIsValid(lower, upper)) {
    return 'Must be lower than upper pitch.';
  }
  return null;
}

function getUpperErrorText(lower, upper) {
  if (!NOTES.includes(upper)) {
    return 'Must be a valid note.';
  }
  if (!pitchRangeIsValid(lower, upper)) {
    return 'Must be higher than lower pitch.';
  }
  return null;
}

export default function Settings() {
  const [settings, setSettings] = useContext(SettingsContext);
  const [lowerPitch, setLowerPitch] = useState(settings.pitchRange.lower);
  const [upperPitch, setUpperPitch] = useState(settings.pitchRange.upper);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function handleLowerPitchChange(event) {
    const newValue = event.target.value;
    const currentUpperPitch = settings.pitchRange.upper;

    setLowerPitch(newValue);

    if (isLowerPitchValid(newValue, currentUpperPitch)) {
      setSettings({
        ...settings,
        pitchRange: {
          lower: newValue,
          upper: currentUpperPitch,
        },
      });
      setSnackbarOpen(true);
    }
  }

  function handleUpperPitchChange(event) {
    const newValue = event.target.value;
    const currentLowerPitch = settings.pitchRange.lower;

    setUpperPitch(newValue);

    if (isUpperPitchValid(currentLowerPitch, newValue)) {
      setSettings({
        ...settings,
        pitchRange: {
          lower: currentLowerPitch,
          upper: newValue,
        },
      });
      setSnackbarOpen(true);
    }
  }

  function handleCloseSnackbar(event, reason) {
    if (reason !== 'clickaway') {
      setSnackbarOpen(false);
    }
  }

  return (
    <div>
      <SettingsSection title="Pitch Range">
        <PitchRangeDescription variant="caption">
          The given pitch is randomly selected from the following range:
        </PitchRangeDescription>

        <PitchRangeContent>
          <PitchRangeInput
            size="small"
            label="Lower"
            value={lowerPitch}
            onChange={handleLowerPitchChange}
            error={!isLowerPitchValid(lowerPitch, settings.pitchRange.upper)}
            helperText={getLowerErrorText(lowerPitch, settings.pitchRange.upper)}
          />
          <Divider orientation="vertical" flexItem />
          <PitchRangeInput
            size="small"
            label="Upper"
            value={upperPitch}
            onChange={handleUpperPitchChange}
            error={!isUpperPitchValid(settings.pitchRange.lower, upperPitch)}
            helperText={getUpperErrorText(settings.pitchRange.lower, upperPitch)}
          />
        </PitchRangeContent>
      </SettingsSection>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert severity="success">
          Settings saved.
        </Alert>
      </Snackbar>
    </div>
  );
}
