import  React, {useState, useEffect} from 'react';
import * as Tone from 'tone';

// @param id: id of instrument track, used for custom event triggers
// @param (optional): object matching notes/indices to urls for sampler instrument
function Sampler({ id, sampleURLs }) {
  const [notesIndex, setNotesIndex] = useState(["C", "D", "E", "G", "A"]);
  const [octave, setOctave] = useState(3);

  const [instrument, setInstrument] = useState(new Tone.Sampler(sampleURLs).toDestination());

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

  return (
    <div></div>
  )

};

export default Sampler;