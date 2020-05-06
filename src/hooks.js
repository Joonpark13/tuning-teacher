import { useState, useEffect, useRef } from 'react';
import { Synth, Panner, Master, gainToDb } from 'tone';

const INITIAL_VOLUME = 85;

export function useSynth(initialPitch, type = 'triangle', pan = 0) {
  const synth = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState(initialPitch);
  const [volumePercent, setVolumePercent] = useState(INITIAL_VOLUME);

  useEffect(() => {
    synth.current = new Synth({ oscillator: { type } }).chain(new Panner(pan), Master);
    synth.current.portamento = 0.1;
    synth.current.volume.value = gainToDb(INITIAL_VOLUME / 100);
  }, []);

  function startPlaying() {
    synth.current.triggerAttack(pitch);
    setIsPlaying(true);
  }

  function stopPlaying() {
    synth.current.triggerRelease();
    setIsPlaying(false);
  }

  function changePitch(offset) {
    const newPitch = pitch + offset;
    setPitch(newPitch);
    synth.setNote(newPitch);
  }

  function setVolume(newVolumePercent) {
    synth.current.volume.value = gainToDb(newVolumePercent / 100);
    setVolumePercent(newVolumePercent);
  }

  return {
    isPlaying,
    startPlaying,
    stopPlaying,
    changePitch,
    volume: volumePercent,
    setVolume
  };
}
