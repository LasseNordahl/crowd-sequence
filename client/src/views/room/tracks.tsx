import { Bar, Note } from "./../../models/proto/models_pb";
import { RenderedTrack } from "./track"

const getBarObject = (x: number) => {
  const newBar = new Bar();
  for (let i = 0; i < x; i++) {
    let newNote = new Note();
    newNote.setActive(Math.random() * 2 > 1);
    newBar.addNotes(newNote);
  }
  return newBar.toObject()
}

const getBars = (x: number) => {
  const bars = []
  for (let i = 0; i < x; i++) {
    bars.push(getBarObject(5));
  }
  return bars;
}

// This will eventually be redux pointing to each one of these objects 
const HARDCODED_TRACKS = [
  {
    name: "hello world",
    bars: getBars(16)
  }
]

// Tracks is the instruments carousel that handles rendering 
// of the different tracks being played.
export const Tracks = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-row">
        <RenderedTrack canInteract={false} name="wolfie" bars={getBars(16)}/>
        <RenderedTrack canInteract={false} name="lasse" bars={getBars(16)}/>
      </div>
      {
        HARDCODED_TRACKS.map(function(data, index) {
          return (
            <RenderedTrack canInteract={true} name={data.name} bars={data.bars} key={index}/>
          )
        })
      }
       <div className="flex flex-row">
        <RenderedTrack canInteract={false} name="zach" bars={getBars(16)}/>
        <RenderedTrack canInteract={false} name="leigh" bars={getBars(16)}/>
      </div>
    </div>
  );
}