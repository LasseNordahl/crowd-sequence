import { useParams } from "react-router-dom";

import { Panel } from "./panel";
import { Tracks } from "./tracks";

const Room = () => {
  const { roomId } = useParams();

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="h-screen flex-1 flex items-center justify-center">
        <Tracks />
      </div>
      <div className="min-w-128 h-screen color-white p-16">
        <Panel />
      </div>
    </div>
  );
};

export default Room;
