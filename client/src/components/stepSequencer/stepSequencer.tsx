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
  const [noteLength, setLength] = useState(1);

  const handleNoteClick = (row: number, col: number) => {
    let copy = [...sequence];
    copy[row][col] = copy[row][col] ? 0 : noteLength;
    setSequence(copy);
    updateGrid(copy, id);
  };

  return (
    <div>
      {/* <div style={{ fontFamily: "Open Sans", fontWeight: "700", "fontStyle": "italic", margin: "2rem",  fontSize: "2rem"}}>{name}</div> */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="m-1 btn">{noteLength}</div> 
        <ul  tabIndex={1} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          {Array.from({length: 10}, (_, i) => i + 1).map((num) => {
            return (
              <li key={num}><a onClick={(e) => {setLength(num)}}>{num}</a></li>
            )
          })}
        </ul>
      </div>

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