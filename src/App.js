import React, { useState, useEffect, useRef } from 'react';
import { Oscillator, Panner, Master } from 'tone';
import styled from 'styled-components';
import './App.css';

const ButtonWrapper = styled.div`
  display: flex;
`;

function useOscillator(pitch, type, pan) {
  const osc = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    osc.current = new Oscillator(pitch, type).chain(new Panner(pan), Master);
  }, []);

  function togglePlaying() {
    if (isPlaying) {
      osc.current.stop();
    } else {
      osc.current.start();
    }
    setIsPlaying(!isPlaying);
  }

  return [isPlaying, togglePlaying, osc.current];
}

function App() {
  const [inTunePitchIsPlaying, toggleInTunePitch] = useOscillator(440, 'triangle', -1);
  const [outOfTunePitchIsPlaying, toggleOutOfTunePitch] = useOscillator(450, 'sine', 1);

  return (
    <main>
      <ButtonWrapper>
        <button onClick={toggleInTunePitch}>
          {inTunePitchIsPlaying ? 'Stop' : 'Play'}
        </button>
        <button onClick={toggleOutOfTunePitch}>
          {outOfTunePitchIsPlaying ? 'Stop' : 'Play'}
        </button>
      </ButtonWrapper>
    </main>
  );
}

export default App;
