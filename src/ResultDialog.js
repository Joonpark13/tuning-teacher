import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { CORRECTNESS_THRESHOLD } from './constants';

function getText(correct, centsOff) {
  const formatted = Math.abs(centsOff).toFixed(1);

  if (correct && centsOff > 0) {
    return `You were only ${formatted} cents above the given pitch. Good job!`;
  }
  if (correct && centsOff < 0) {
    return `You were only ${formatted} cents below the given pitch. Good job!`;
  }
  if (correct && centsOff === 0) {
    return 'Holy cow, you were right on the money! 0 cents off!';
  }
  if (centsOff > 0) {
    return `You were ${formatted} cents above the given pitch. You need to be within ${CORRECTNESS_THRESHOLD} cents of the given pitch to be correct.`;
  }
  return `You were ${formatted} cents below the given pitch. You need to be within ${CORRECTNESS_THRESHOLD} cents of the given pitch to be correct.`;
}

export default function ResultDialog({ open, onClose, centsOff, onNewPitch }) {
  const correct = Math.abs(centsOff) <= CORRECTNESS_THRESHOLD;

  function handleNewPitch() {
    onNewPitch();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{correct ? 'You got it!' : 'Not quite there.'}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {getText(correct, centsOff)}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onClose}>Close</Button>
        <Button color="primary" onClick={handleNewPitch}>New Pitch</Button>
      </DialogActions>
    </Dialog>
  );
}

ResultDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  centsOff: PropTypes.number,
  onNewPitch: PropTypes.func,
};
