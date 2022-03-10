// package: 
// file: proto/models.proto

import * as jspb from "google-protobuf";

export class Server extends jspb.Message {
  getRoomsMap(): jspb.Map<string, Room>;
  clearRoomsMap(): void;
  getCapacity(): number;
  setCapacity(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Server.AsObject;
  static toObject(includeInstance: boolean, msg: Server): Server.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Server, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Server;
  static deserializeBinaryFromReader(message: Server, reader: jspb.BinaryReader): Server;
}

export namespace Server {
  export type AsObject = {
    roomsMap: Array<[string, Room.AsObject]>,
    capacity: number,
  }
}

export class Room extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getOwner(): string;
  setOwner(value: string): void;

  clearUsersList(): void;
  getUsersList(): Array<string>;
  setUsersList(value: Array<string>): void;
  addUsers(value: string, index?: number): string;

  getTracksMap(): jspb.Map<string, Track>;
  clearTracksMap(): void;
  getTempo(): number;
  setTempo(value: number): void;

  getMeasures(): number;
  setMeasures(value: number): void;

  getSubdivision(): number;
  setSubdivision(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Room.AsObject;
  static toObject(includeInstance: boolean, msg: Room): Room.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Room, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Room;
  static deserializeBinaryFromReader(message: Room, reader: jspb.BinaryReader): Room;
}

export namespace Room {
  export type AsObject = {
    id: string,
    owner: string,
    usersList: Array<string>,
    tracksMap: Array<[string, Track.AsObject]>,
    tempo: number,
    measures: number,
    subdivision: number,
  }
}

export class CreateRoom extends jspb.Message {
  getMeasures(): number;
  setMeasures(value: number): void;

  getSubdivisions(): number;
  setSubdivisions(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRoom.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRoom): CreateRoom.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRoom, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRoom;
  static deserializeBinaryFromReader(message: CreateRoom, reader: jspb.BinaryReader): CreateRoom;
}

export namespace CreateRoom {
  export type AsObject = {
    measures: number,
    subdivisions: number,
  }
}

export class NoteSequence extends jspb.Message {
  clearTimeList(): void;
  getTimeList(): Array<number>;
  setTimeList(value: Array<number>): void;
  addTime(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NoteSequence.AsObject;
  static toObject(includeInstance: boolean, msg: NoteSequence): NoteSequence.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NoteSequence, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NoteSequence;
  static deserializeBinaryFromReader(message: NoteSequence, reader: jspb.BinaryReader): NoteSequence;
}

export namespace NoteSequence {
  export type AsObject = {
    timeList: Array<number>,
  }
}

export class Track extends jspb.Message {
  getOwnername(): string;
  setOwnername(value: string): void;

  getId(): string;
  setId(value: string): void;

  hasInstrument(): boolean;
  clearInstrument(): void;
  getInstrument(): Instrument | undefined;
  setInstrument(value?: Instrument): void;

  getLength(): number;
  setLength(value: number): void;

  clearSequenceList(): void;
  getSequenceList(): Array<NoteSequence>;
  setSequenceList(value: Array<NoteSequence>): void;
  addSequence(value?: NoteSequence, index?: number): NoteSequence;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Track.AsObject;
  static toObject(includeInstance: boolean, msg: Track): Track.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Track, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Track;
  static deserializeBinaryFromReader(message: Track, reader: jspb.BinaryReader): Track;
}

export namespace Track {
  export type AsObject = {
    ownername: string,
    id: string,
    instrument?: Instrument.AsObject,
    length: number,
    sequenceList: Array<NoteSequence.AsObject>,
  }
}

export class Bar extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  clearNotesList(): void;
  getNotesList(): Array<Note>;
  setNotesList(value: Array<Note>): void;
  addNotes(value?: Note, index?: number): Note;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bar.AsObject;
  static toObject(includeInstance: boolean, msg: Bar): Bar.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Bar, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bar;
  static deserializeBinaryFromReader(message: Bar, reader: jspb.BinaryReader): Bar;
}

export namespace Bar {
  export type AsObject = {
    height: number,
    notesList: Array<Note.AsObject>,
  }
}

export class Note extends jspb.Message {
  getActive(): boolean;
  setActive(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Note.AsObject;
  static toObject(includeInstance: boolean, msg: Note): Note.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Note, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Note;
  static deserializeBinaryFromReader(message: Note, reader: jspb.BinaryReader): Note;
}

export namespace Note {
  export type AsObject = {
    active: boolean,
  }
}

export class Instrument extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getOctave(): string;
  setOctave(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Instrument.AsObject;
  static toObject(includeInstance: boolean, msg: Instrument): Instrument.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Instrument, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Instrument;
  static deserializeBinaryFromReader(message: Instrument, reader: jspb.BinaryReader): Instrument;
}

export namespace Instrument {
  export type AsObject = {
    name: string,
    octave: string,
  }
}

export class NoteChange extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  getNewval(): number;
  setNewval(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NoteChange.AsObject;
  static toObject(includeInstance: boolean, msg: NoteChange): NoteChange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NoteChange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NoteChange;
  static deserializeBinaryFromReader(message: NoteChange, reader: jspb.BinaryReader): NoteChange;
}

export namespace NoteChange {
  export type AsObject = {
    x: number,
    y: number,
    newval: number,
  }
}

