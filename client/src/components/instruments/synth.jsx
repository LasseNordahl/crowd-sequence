import  React, {useState, useEffect} from 'react';
import * as Tone from 'tone';

const defaultSynthOptions = {
  "volume": 0,
  "detune": 0,
  "portamento": 0.5,
  "envelope": {
    "attack": 0.1,
    "attackCurve": "linear",
    "decay": 0.1,
    "decayCurve": "exponential",
    "release": 0.5,
    "releaseCurve": "exponential",
    "sustain": 0.3
  },
  "oscillator": {
    "partialCount": 3,
    "partials": [
      1,
      1,
      1
    ],
    "phase": 0,
    "type": 'sine3'
  }
};

// @param id: id of instrument track, used for custom event triggers
function Synth ({ id }) {
  const [envAttack, setEnvAttack] = useState(1);
  const [synthType, setSynthType] = useState('sine3');
  const [notesIndex, setNotesIndex] = useState(["C", "D", "E", "G", "A"]);
  const [octave, setOctave] = useState(3);

  const [instrument, setInstrument] = useState(new Tone.PolySynth(Tone.Synth, defaultSynthOptions).toDestination());

  // : new Tone.Sampler({
  //     urls: samples
  //   }).toDestination();

  function triggerHandler (event) {
    let detail = event.detail;
    if (detail.id === id) {
      let notes = notesIndex.filter((note, idx) => detail.row[idx]);
      notes = notes.map( (value) => {return value + octave});
      // console.log(notes);
      // console.log(detail.time);
      instrument.triggerAttackRelease(notes, "8n", detail.time);
    }
  }
  
  useEffect(() => {
    window.addEventListener(`trigger_tick`, triggerHandler, false);

    return function cleanup() {
      window.removeEventListener(`trigger_tick`, triggerHandler);
    }
  }, [triggerHandler, instrument]);

  // @param member: what part of the instrument does this update (oscillator, envelope, filter, etc.)
  // @param attribute: what attribute to change (envelope's attack, oscillator's type, filter's Q, etc.)
  // @param value: new value to set it to
  function updateSynth(member, attribute, value) {
    instrument.releaseAll();
    instrument.set({
      [member]: {
        [attribute]: value
      }
    });
    setInstrument(instrument);
    // // gets options from instrument to display
    // console.log(instrument.get());
    // // gets float array describing waveform of oscillator
    // console.log(new Tone.Oscillator(instrument.get()['oscillator']).asArray());
  }

  return (
    <div>
      <input type="range" max="10" value={envAttack} className="range" label="envAttack" step={1} onChange={(e) => {updateSynth('envelope', 'release', e.target.value); setEnvAttack(e.target.value)}}/> 
      <select className="select select-bordered w-full max-w-xs" value={synthType} onChange={(e) => {updateSynth('oscillator', 'type', e.target.value); setSynthType(e.target.value)}}>
        <option disabled="disabled">Choose your superpower</option> 
        <option key={'triangle3'}>triangle3</option> 
        <option  key={'sine3'}>sine3</option> 
        <option  key={'square'}>square</option>
      </select>

    </div>
  )

}

export default Synth;