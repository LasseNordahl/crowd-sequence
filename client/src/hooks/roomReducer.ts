export interface User {
  name: string
  track: number[][]
}

export interface RoomData {
  roomId: string,
  numMeasures: number,
  numSubdivisions: number,
  users: { [name:string] : User }
}

export const initialRoomState: RoomData = {
  roomId: '',
  numMeasures: 0,
  numSubdivisions: 0,
  users: {}
}

const generateGrid = (x: number, y: number) => {
  let grid = [];
  for (let j=0; j < x; j++) {
    grid.push(new Array(y).fill(0));
  }
  return grid
}

export function roomReducer(state: RoomData, { action, payload }: any): RoomData {
  console.log(`received dispatch of ${action} with payload ${payload}`)
  switch (action) {
    case 'INIT': {
      const tmpUsers: {[name: string] : User} = {}
      payload['users'].forEach((name: string) => {
        tmpUsers[name] = {
          name: name,
          track: generateGrid(payload.numMeasures * payload.numSubdivisions, 8)
        }
      })
      return {
        ...state,
        numMeasures: payload.numMeasures,
        numSubdivisions: payload.numSubdivisions,
        users: tmpUsers
      }
    }
    case 'USER_JOIN': {
      return {
        ...state,
        users: {
          ...state.users,
          [payload.name] : {
            name: payload.name,
            track: generateGrid(state.numMeasures * state.numSubdivisions, 8)
          }
        }
      }
    }
    default: {
      return state;
    }
  }
}