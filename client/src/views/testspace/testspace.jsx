import React, { useEffect, useState } from "react";
import * as Tone from "tone";

import { StepSequencer } from "../../components";

// Function which creates a 5xn grid,
// with our chosen notes on the vertical axis
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

  const synth = new Tone.PolySynth({
    oscilator: {
      type: "sine",
    },
    envelope: {
      attack: 0.05,
    }
  }).toDestination();

  // console.log(GenerateGrid(colAmount));
  useEffect(() => {
    // console.log(sequence);
    // setSequence(GenerateGrid(colAmount));
    playMusic();
  }, []);

  useEffect(() => {
    if (sequence) {

      let music = [];
      sequence.map((column) => {
        let columnNotes = [];
        column.map((cellValue, rowIndex) => {
            cellValue && columnNotes.push(noteIndex[rowIndex] + octave);
        });
        music.push(columnNotes);
      });
      // console.log(columnNotes);
      console.log(music);

      let loop = new Tone.Sequence((time, column) => {
        // Highlight column with styling
        //setCurrCol(column);

        synth.triggerAttackRelease(music[column], "8n", time);
        
      }, [...Array(colAmount).keys()], "8n").start(0);

      // cleanup function to dispose old sequence if there are updates
      return () => loop.dispose();
    }
  }, [sequence])

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
      {!isPlaying ? 
        <button onClick={playMusic}>play</button> :

        <StepSequencer 
          disabled={false}
          inputGrid={sequence}
          updateGrid={updateSequence}
          currentCol={currentCol}
        />
      }
      
      
    </div>
  )
}

export default TestSpace;