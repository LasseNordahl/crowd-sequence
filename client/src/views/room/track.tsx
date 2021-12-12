import { Bar, Note } from "./../../models/proto/models_pb";
import { DotsVerticalIcon, CogIcon } from "@heroicons/react/solid";

// We can refactor this to take in a track object.
// TODO(lasse) refactor this.

interface NoteProps {
  note: Note.AsObject;
}

const RenderedNote = ({ note }: NoteProps) => {
  return (
    <div
      className={`${
        note.active ? "bg-orange-400" : "bg-orange-100"
      } m-1 rounded-md w-8 h-8 cursor-pointer`}
    ></div>
  );
};

interface BarProps {
  bar: Bar.AsObject;
}

const RenderedBar = ({ bar }: BarProps) => {
  return (
    <div className="flex flex-col">
      {bar.notesList.map(function (note, index) {
        return <RenderedNote note={note} key={index} />;
      })}
    </div>
  );
};

interface TrackProps {
  name: string;
  bars: Bar.AsObject[]; // Bars represents how many notes we have in a track.
  canInteract: boolean;
}

export const RenderedTrack = ({ name, bars, canInteract }: TrackProps) => {
  return (
    <div
      className={`mt-8 mb-8 flex flex-row ${
        canInteract ? "" : "transform scale-75"
      } cursor-default`}
    >
      <div className="flex flex-col items-end justify-start pt-4 pr-4">
        <h3 className="mb-4">{name}</h3>
        {canInteract ? (
          <>
            <DotsVerticalIcon className="w-6 h-6 mb-4 cursor-pointer" />
            <CogIcon className="w-6 h-6 cursor-pointer" />
          </>
        ) : null}
      </div>
      {bars.map(function (bar, index) {
        return <RenderedBar bar={bar} key={index} />;
      })}
    </div>
  );
};
