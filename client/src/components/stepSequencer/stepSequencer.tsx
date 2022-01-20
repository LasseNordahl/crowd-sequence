import React, { useEffect, useState } from "react";
// import './stepSequencer.scss';

const NoteButton: React.FC<{disabled:boolean, isActive:boolean, onClick:()=>any}> = ({disabled, isActive, onClick}) => {
  const class_used = isActive ? 'btn-active' : '';
  return (
    <button className={`btn btn-primary ${class_used}`} onClick={onClick}>
    N</button>
  );
};

type StepSequencerProps = {
  disabled: boolean,
  inputGrid: any[][],
  updateGrid: (grid:any[][], id: number)=>any,
  currentCol: number,
  id: number
}

function StepSequencer ({disabled, inputGrid, updateGrid, currentCol, id}: StepSequencerProps) {
  const [sequence, setSequence] = useState(inputGrid);

  const handleNoteClick = (row: number, col: number) => {
    let copy = [...sequence];
    copy[row][col] = copy[row][col] ? null : 1;
    setSequence(copy);
    updateGrid(copy, id);
  };

  return (
    <div>
      {/* <div style={{ fontFamily: "Open Sans", fontWeight: "700", "fontStyle": "italic", margin: "2rem",  fontSize: "2rem"}}>{name}</div> */}
      {inputGrid && inputGrid.map((col, rowIndex) => (
        <div >
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