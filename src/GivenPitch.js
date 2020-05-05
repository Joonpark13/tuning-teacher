import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, CardContent, Typography, Button, Slider } from '@material-ui/core';
import { PlayArrow, Stop, VolumeDown, VolumeUp } from '@material-ui/icons';
import { useSynth } from './hooks';

const HARD_LEFT = -1;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SliderWrapper = styled.div`
  display: flex;
`;

export default function GivenPitch({ pitch }) {
  const { isPlaying, startPlaying, stopPlaying, volume, setVolume } = useSynth(pitch, 'triangle', HARD_LEFT);

  return (
    <Card>
      <CardContent>
        <Header>
          <Typography variant="subtitle1">Given Pitch</Typography>
          <Typography variant="caption">Left Ear</Typography>
        </Header>

        <Button
          variant="contained"
          color="primary"
          onClick={isPlaying ? stopPlaying : startPlaying}
          startIcon={isPlaying ? <Stop /> : <PlayArrow />}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </Button>

        <SliderWrapper>
          <VolumeDown />
          <Slider value={volume} onChange={(event, newVolume) => setVolume(newVolume)} />
          <VolumeUp />
        </SliderWrapper>
      </CardContent>
    </Card>
  );
}

GivenPitch.propTypes = {
  pitch: PropTypes.number.isRequired,
};
