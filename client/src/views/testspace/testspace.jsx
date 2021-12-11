import React, { useEffect, useState } from "react";
import * as Tone from "tone";

import { StepSequencer, Instrument } from "../../components";

// Function which creates a 5xn grid,
// used as intermediary until data retrieval from webhooks works
function GenerateGrid(n) {
  const grid = [];
  for (let i = 0; i < n; i++) {
    grid.push(new Array(5).fill(false));
  }
  return grid;
}

const TestSpace = () => {
  const [sequence, setSequence] = useState(GenerateGrid(10));
  const [octave, setOctave] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCol, setCurrCol] = useState(null);

  const noteIndex = ["C", "D", "E", "G", "A"];
  const colAmount = 10;

  const [envAttack, setEnvAttack] = useState(0.5);

  let loop;// holds Tone.Sequence object

  const synth = new Tone.PolySynth({
    oscilator: {
      type: "sine",
    },
    envelope: {
      attack: envAttack,
    }
  }).toDestination();

  // console.log(GenerateGrid(colAmount));
  // useEffect(() => {
  //   // console.log(sequence);
  //   // setSequence(GenerateGrid(colAmount));
  //   playMusic();
  // }, []);

  useEffect(() => {
    // if (sequence) {

      // let music = [];
      // sequence.map((column) => {
      //   let columnNotes = [];
      //   column.map((cellValue, rowIndex) => {
      //       cellValue && columnNotes.push(noteIndex[rowIndex] + octave);
      //   });
      //   music.push(columnNotes);
      // });
      // // console.log(columnNotes);
      // console.log(music);

      let loop = new Tone.Sequence(tick, [...Array(colAmount).keys()], "8n").start(0);

      // cleanup function to dispose old sequence if there are updates
      return () => loop.dispose();
    // }
  }, [sequence])

  function tick(time, column) {
    console.log(column);
    let seqIdx = 0;// this will normally be looped through by an array
    window.dispatchEvent(new CustomEvent('trigger_tick', {
        detail: {
          'time': time, 'row': sequence[column], 'id': seqIdx,
        },
        composed: true,
      }
    ));
  }

  // for updating sequence
  async function updateSequence(seq) {
    // send new data through websocket here
    setSequence(seq);
  }

  async function playMusic() {
    // Starts our Tone context
    await Tone.start();

    if (isPlaying) {
      // Turn of our player if music is currently playing
      setIsPlaying(false);
      console.log('stopping');
      await Tone.Transport.stop();

      return;
    }

    setIsPlaying(true);
    // Toggles playback
    console.log('starting');
    await Tone.Transport.start();
  }

  return (
    <div className="sequence">

        <button onClick={playMusic}>play</button>

        <StepSequencer 
          disabled={false}
          inputGrid={sequence}
          updateGrid={updateSequence}
          currentCol={currentCol}
        />
        <Instrument
          type="synth"
          id={0}
        />
      
    </div>
  )
}

export default TestSpace;