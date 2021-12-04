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
  getName(): string;
  setName(value: string): void;

  getId(): string;
  setId(value: string): void;

  clearTracksList(): void;
  getTracksList(): Array<Track>;
  setTracksList(value: Array<Track>): void;
  addTracks(value?: Track, index?: number): Track;

  getSpeed(): number;
  setSpeed(value: number): void;

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
    name: string,
    id: string,
    tracksList: Array<Track.AsObject>,
    speed: number,
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

  clearBarsList(): void;
  getBarsList(): Array<Bar>;
  setBarsList(value: Array<Bar>): void;
  addBars(value?: Bar, index?: number): Bar;

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
    barsList: Array<Bar.AsObject>,
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

