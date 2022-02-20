import  React, {useState, useEffect} from 'react';
import * as Tone from 'tone';

// @param id: id of instrument track, used for custom event triggers
// @param (optional): object matching notes/indices to urls for sampler instrument
function Sampler({ id, sampleURLs }) {
  const [notesIndex, setNotesIndex] = useState(["C", "D", "E", "G", "A"]);
  const [octave, setOctave] = useState(3);

  const [instrument, setInstrument] = useState(new Tone.Sampler(sampleURLs).toDestination());

  function triggerHandler (event) {
    // console.log(`event triggered for id: ${event.detail.id}`);
    let detail = event.detail;
    if (detail.id === id) {
      let notes = [];
      let durations = [];
      const gain = new Tone.Gain();// to convert eighth note durations to seconds
      for (let i=0; i<detail.row.length; i++) {
        if (detail.row[i]) {
          notes.push(notesIndex[i]+octave);
          durations.push(gain.toSeconds("8n")*detail.row[i])
        }
      }
      // let notes = notesIndex.filter((note, idx) => detail.row[idx]);
      // notes = notes.map( (value) => {return value + octave});
      // console.log(notes);
      // console.log(detail.time);
      instrument.triggerAttackRelease(notes, durations, detail.time);
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