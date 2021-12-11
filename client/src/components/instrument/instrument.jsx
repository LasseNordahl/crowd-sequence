import  React, {useState, useEffect} from 'react';
import * as Tone from 'tone';

// @param type: holds which type of ToneJS object to use (synth, sampler)
// @param id: id of instrument track, used for custom event triggers
// @param (optional): object matching notes/indices to urls for sampler instrument
function Instrument ({type, id, samples}) {
  const [envAttack, setEnvAttack] = useState(0.2);
  const [notesIndex, setNotesIndex] = useState(["C", "D", "E", "G", "A"]);
  const [octave, setOctave] = useState(3);

  const instrument = //type === "synth" ?
    new Tone.PolySynth({
      "volume": 0,
      "detune": 0,
      "portamento": 0,
      "envelope": {
        "attack": envAttack,
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
        "type": "sine3"
      }
    }).toDestination();

  // : new Tone.Sampler({
  //     urls: samples
  //   }).toDestination();

  function triggerHandler (event) {
    let detail = event.detail;
    if (detail.id === id) {
      let notes = notesIndex.filter((note, idx) => detail.row[idx]);
      notes = notes.map( (value) => {return value + octave});
      console.log(notes);
      console.log(detail.time);
      instrument.triggerAttackRelease(notes, "8n", detail.time);
    }
  }
  
  useEffect(() => {
    window.addEventListener(`trigger_tick`, triggerHandler, false);

    return function cleanup() {
      window.removeEventListener(`trigger_tick`, triggerHandler);
    }
  }, [triggerHandler, instrument]);

  return (
    <div>
      <input type="range" max="2" value={envAttack} class="range" label="envAttack" onChange={(e) => {setEnvAttack(e.value)}}/> 
    </div>
  )

}

export default Instrument;