import React, { useEffect, useState } from "react";
// import './stepSequencer.scss';

const NoteButton: React.FC<{disabled:boolean, isActive:boolean, onClick:()=>any}> = ({disabled, isActive, onClick}) => {
  const class_used = isActive ? 'btn-active' : '';
  return (
    <button className={`btn btn-primary ${class_used}`} onClick={onClick}>
    a</button>
  );
};

type StepSequencerProps = {
  disabled: boolean,
  inputGrid: boolean[][],
  updateGrid: (grid:boolean[][])=>any,
  currentCol: number
}

function StepSequencer ({disabled, inputGrid, updateGrid, currentCol}: StepSequencerProps) {
  const [sequence, setSequence] = useState(inputGrid);

  const handleNoteClick = (row: number, col: number) => {
    let copy = [...sequence];
    copy[row][col] = copy[row][col] ? false : true;
    setSequence(copy);
    updateGrid(copy);
  };

  return (
    <div className={`sequencer ${disabled ? "sequencer_disabled" : ""}`}>
      {/* <div style={{ fontFamily: "Open Sans", fontWeight: "700", "fontStyle": "italic", margin: "2rem",  fontSize: "2rem"}}>{name}</div> */}
      {inputGrid && inputGrid.map((col, rowIndex) => (
        <div className={currentCol === rowIndex ? "note-column note-column--active" : "note-column"}>
          {col.map((cellValue, colIndex) => (
            <NoteButton
              key={colIndex+':'+rowIndex}
              disabled={disabled}
              isActive={cellValue}
              onClick={() => handleNoteClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default StepSequencer;