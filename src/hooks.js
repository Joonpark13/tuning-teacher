import { useState, useEffect, useRef } from 'react';
import { Synth, Panner, Master, gainToDb } from 'tone';

const INITIAL_VOLUME = 85;

export function useSynth(initialPitch, initialDetune = 0, type = 'triangle', pan = 0) {
  const synth = useRef(null);
  const [pitch] = useState(initialPitch);
  const [detune] = useState(initialDetune);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumePercent, setVolumePercent] = useState(INITIAL_VOLUME);

  useEffect(() => {
    synth.current = new Synth({ oscillator: { type } }).chain(new Panner(pan), Master);
    synth.current.portamento = 0.005;
    synth.current.volume.value = gainToDb(INITIAL_VOLUME / 100);
    synth.current.detune.value = detune;

    return () => {
      synth.current.triggerRelease();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function startPlaying() {
    synth.current.triggerAttack(pitch);
    setIsPlaying(true);
  }

  function stopPlaying() {
    synth.current.triggerRelease();
    setIsPlaying(false);
  }

  function changePitch(offsetCents) {
    synth.current.detune.value = synth.current.detune.value + offsetCents;
  }

  function resetPitch() {
    synth.current.detune.value = detune;
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
    setVolume,
    currentOffset: synth.current ? synth.current.detune.value : 0,
    resetPitch,
  };
}

export function usePressAndHold(handler) {
  let holding = false;

  function onPress() {
    holding = true;
    const id = setInterval(() => {
      if (!holding) {
        clearInterval(id);
      } else {
        handler();
      }
    }, 10);
  }

  function onRelease() {
    holding = false;
  }

  return [onPress, onRelease];
}

export function useLocalStorageState(initialState, storageKey) {
  const [state, setter] = useState(JSON.parse(window.localStorage.getItem(storageKey)) || initialState);
  function setState(newValue) {
    setter(newValue);
    window.localStorage.setItem(storageKey, JSON.stringify(newValue));
  }
  return [state, setState];
}
