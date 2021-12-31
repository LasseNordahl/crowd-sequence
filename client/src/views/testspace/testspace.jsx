import React, { useEffect, useState } from "react";
import * as Tone from "tone";

import { StepSequencer, Synth, Sampler } from "../../components";

// sound samples
import hihatFile1 from "../../samples/drums/hihat1.wav"
import hihatFile2 from "../../samples/drums/hihat2.wav"
import kickFile from "../../samples/drums/kick.wav"
import snareFile from "../../samples/drums/snare.wav"
import shakerFile from "../../samples/drums/shaker1.wav"

// Function which creates a 5xn grid,
// used as intermediary until data retrieval from webhooks works
function GenerateGrid(n) {
  const grid = [];
  for (let j=0; j <= 2; j++) {
    grid.push(new Array());
    for (let i = 0; i < n; i++) {
      grid[j].push(new Array(5).fill(false));
    }
  }
  console.log(grid);
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

  useEffect(() => {
      let loop = new Tone.Sequence(tick, [...Array(colAmount).keys()], "8n").start(0);

      // cleanup function to dispose old sequence if there are updates
      return () => loop.dispose();
    // }
  }, [sequence])

  function tick(time, column) {
    for(let i=0; i<2; i++) {
      window.dispatchEvent(new CustomEvent('trigger_tick', {
        detail: {
          'time': time, 'row': sequence[i][column], 'id': i,
        },
        composed: true,
        }
      ));
    }
    
  }

  // for updating sequence
  async function updateSequence(seq, id) {
    // send new data through websocket here
    let copy = [...sequence];
    sequence[id] = seq;
    setSequence(sequence);
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
    <div className="grid gap-4 grid-cols-3 grid-rows-1">
        <button onClick={playMusic}>play</button>

        <div className="w-full">
        <StepSequencer 
          disabled={false}
          inputGrid={sequence[0]}
          updateGrid={updateSequence}
          currentCol={currentCol}
          id={0}
        />
        <Synth
          id={0}
        />
        </div>

        {/* <div className="w-full">
        <StepSequencer 
          disabled={false}
          inputGrid={sequence[1]}
          updateGrid={updateSequence}
          currentCol={currentCol}
          id={1}
        />
        <Sampler
          id={1}
          sampleURLs={{urls: {
            A1: "A1.mp3",
          },
          baseUrl: "https://tonejs.github.io/audio/salamander/"}}
        />
        </div> */}

        <div className="w-full">
        <StepSequencer 
          disabled={false}
          inputGrid={sequence[1]}
          updateGrid={updateSequence}
          currentCol={currentCol}
          id={1}
        />
        <Sampler
          id={1}
          sampleURLs={{urls: {
            C3: hihatFile1,
            D3: hihatFile2,
            E3: kickFile,
            G3: snareFile,
            A3: shakerFile
          },
          baseUrl: ""}}
        />
        </div>
        
    </div>
  )
}

export default TestSpace;