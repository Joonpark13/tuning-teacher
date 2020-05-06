import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Slider, Typography, Menu, MenuItem } from '@material-ui/core';
import { PlayArrow, Stop, ExpandMore } from '@material-ui/icons';

const Container = styled.div`
  text-align: center;
`;

const StyledMenuItem = styled(MenuItem)`
  height: 180px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const StyledSlider = styled(Slider)`
  margin: 4px 0;
`;

const Title = styled(Typography)`
  margin-bottom: 8px;
`;

export default function Pitch({ title, isPlaying, startPlaying, stopPlaying, volume, setVolume }) {
  const [volumeMenuOpen, setVolumeMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  function handleOpenMenu(event) {
    setAnchor(event.currentTarget);
    setVolumeMenuOpen(true);
  }

  return (
    <Container>
      <Title variant="h6">{title}</Title>

      <ButtonWrapper>
        <Button
          variant="outlined"
          color="primary"
          onClick={isPlaying ? stopPlaying : startPlaying}
          startIcon={isPlaying ? <Stop /> : <PlayArrow />}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </Button>
      </ButtonWrapper>

      <Button
        startIcon={<ExpandMore />}
        onClick={handleOpenMenu}
      >
        Volume
      </Button>
      <Menu
        open={volumeMenuOpen}
        onClose={() => setVolumeMenuOpen(false)}
        anchorEl={anchor}
      >
        <StyledMenuItem>
          <StyledSlider
            orientation="vertical"
            value={volume}
            onChange={(event, newVolume) => setVolume(newVolume)}
          />
        </StyledMenuItem>
      </Menu>
    </Container>
  );
}

Pitch.propTypes = {
  title: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
  startPlaying: PropTypes.func,
  stopPlaying: PropTypes.func,
  volume: PropTypes.number,
  setVolume: PropTypes.func,
};
