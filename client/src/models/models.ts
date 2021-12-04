/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

export interface Server {
  rooms: { [key: string]: Room };
  capacity: number;
}

export interface Server_RoomsEntry {
  key: string;
  value: Room | undefined;
}

export interface Room {
  name: string;
  id: string;
  tracks: Track[];
  speed: number;
}

export interface Track {
  ownerName: string;
  id: string;
  instrument: Instrument | undefined;
  length: number;
  bars: Bar[];
}

export interface Bar {
  height: number;
  notes: Note[];
}

export interface Note {
  active: boolean;
}

export interface Instrument {
  name: string;
  octave: string;
}

const baseServer: object = { capacity: 0 };

export const Server = {
  encode(message: Server, writer: Writer = Writer.create()): Writer {
    Object.entries(message.rooms).forEach(([key, value]) => {
      Server_RoomsEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    if (message.capacity !== 0) {
      writer.uint32(16).int32(message.capacity);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Server {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServer } as Server;
    message.rooms = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = Server_RoomsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.rooms[entry1.key] = entry1.value;
          }
          break;
        case 2:
          message.capacity = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Server {
    const message = { ...baseServer } as Server;
    message.rooms = Object.entries(object.rooms ?? {}).reduce<{
      [key: string]: Room;
    }>((acc, [key, value]) => {
      acc[key] = Room.fromJSON(value);
      return acc;
    }, {});
    message.capacity =
      object.capacity !== undefined && object.capacity !== null
        ? Number(object.capacity)
        : 0;
    return message;
  },

  toJSON(message: Server): unknown {
    const obj: any = {};
    obj.rooms = {};
    if (message.rooms) {
      Object.entries(message.rooms).forEach(([k, v]) => {
        obj.rooms[k] = Room.toJSON(v);
      });
    }
    message.capacity !== undefined && (obj.capacity = message.capacity);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Server>, I>>(object: I): Server {
    const message = { ...baseServer } as Server;
    message.rooms = Object.entries(object.rooms ?? {}).reduce<{
      [key: string]: Room;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Room.fromPartial(value);
      }
      return acc;
    }, {});
    message.capacity = object.capacity ?? 0;
    return message;
  },
};

const baseServer_RoomsEntry: object = { key: "" };

export const Server_RoomsEntry = {
  encode(message: Server_RoomsEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Room.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Server_RoomsEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServer_RoomsEntry } as Server_RoomsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Room.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Server_RoomsEntry {
    const message = { ...baseServer_RoomsEntry } as Server_RoomsEntry;
    message.key =
      object.key !== undefined && object.key !== null ? String(object.key) : "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Room.fromJSON(object.value)
        : undefined;
    return message;
  },

  toJSON(message: Server_RoomsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Room.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Server_RoomsEntry>, I>>(
    object: I
  ): Server_RoomsEntry {
    const message = { ...baseServer_RoomsEntry } as Server_RoomsEntry;
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Room.fromPartial(object.value)
        : undefined;
    return message;
  },
};

const baseRoom: object = { name: "", id: "", speed: 0 };

export const Room = {
  encode(message: Room, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    for (const v of message.tracks) {
      Track.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.speed !== 0) {
      writer.uint32(32).int32(message.speed);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Room {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRoom } as Room;
    message.tracks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.tracks.push(Track.decode(reader, reader.uint32()));
          break;
        case 4:
          message.speed = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Room {
    const message = { ...baseRoom } as Room;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.tracks = (object.tracks ?? []).map((e: any) => Track.fromJSON(e));
    message.speed =
      object.speed !== undefined && object.speed !== null
        ? Number(object.speed)
        : 0;
    return message;
  },

  toJSON(message: Room): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = message.id);
    if (message.tracks) {
      obj.tracks = message.tracks.map((e) => (e ? Track.toJSON(e) : undefined));
    } else {
      obj.tracks = [];
    }
    message.speed !== undefined && (obj.speed = message.speed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Room>, I>>(object: I): Room {
    const message = { ...baseRoom } as Room;
    message.name = object.name ?? "";
    message.id = object.id ?? "";
    message.tracks = object.tracks?.map((e) => Track.fromPartial(e)) || [];
    message.speed = object.speed ?? 0;
    return message;
  },
};

const baseTrack: object = { ownerName: "", id: "", length: 0 };

export const Track = {
  encode(message: Track, writer: Writer = Writer.create()): Writer {
    if (message.ownerName !== "") {
      writer.uint32(10).string(message.ownerName);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.instrument !== undefined) {
      Instrument.encode(message.instrument, writer.uint32(26).fork()).ldelim();
    }
    if (message.length !== 0) {
      writer.uint32(32).int32(message.length);
    }
    for (const v of message.bars) {
      Bar.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Track {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTrack } as Track;
    message.bars = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ownerName = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.instrument = Instrument.decode(reader, reader.uint32());
          break;
        case 4:
          message.length = reader.int32();
          break;
        case 5:
          message.bars.push(Bar.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Track {
    const message = { ...baseTrack } as Track;
    message.ownerName =
      object.ownerName !== undefined && object.ownerName !== null
        ? String(object.ownerName)
        : "";
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    message.instrument =
      object.instrument !== undefined && object.instrument !== null
        ? Instrument.fromJSON(object.instrument)
        : undefined;
    message.length =
      object.length !== undefined && object.length !== null
        ? Number(object.length)
        : 0;
    message.bars = (object.bars ?? []).map((e: any) => Bar.fromJSON(e));
    return message;
  },

  toJSON(message: Track): unknown {
    const obj: any = {};
    message.ownerName !== undefined && (obj.ownerName = message.ownerName);
    message.id !== undefined && (obj.id = message.id);
    message.instrument !== undefined &&
      (obj.instrument = message.instrument
        ? Instrument.toJSON(message.instrument)
        : undefined);
    message.length !== undefined && (obj.length = message.length);
    if (message.bars) {
      obj.bars = message.bars.map((e) => (e ? Bar.toJSON(e) : undefined));
    } else {
      obj.bars = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Track>, I>>(object: I): Track {
    const message = { ...baseTrack } as Track;
    message.ownerName = object.ownerName ?? "";
    message.id = object.id ?? "";
    message.instrument =
      object.instrument !== undefined && object.instrument !== null
        ? Instrument.fromPartial(object.instrument)
        : undefined;
    message.length = object.length ?? 0;
    message.bars = object.bars?.map((e) => Bar.fromPartial(e)) || [];
    return message;
  },
};

const baseBar: object = { height: 0 };

export const Bar = {
  encode(message: Bar, writer: Writer = Writer.create()): Writer {
    if (message.height !== 0) {
      writer.uint32(8).int32(message.height);
    }
    for (const v of message.notes) {
      Note.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Bar {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBar } as Bar;
    message.notes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int32();
          break;
        case 2:
          message.notes.push(Note.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bar {
    const message = { ...baseBar } as Bar;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.notes = (object.notes ?? []).map((e: any) => Note.fromJSON(e));
    return message;
  },

  toJSON(message: Bar): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = message.height);
    if (message.notes) {
      obj.notes = message.notes.map((e) => (e ? Note.toJSON(e) : undefined));
    } else {
      obj.notes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bar>, I>>(object: I): Bar {
    const message = { ...baseBar } as Bar;
    message.height = object.height ?? 0;
    message.notes = object.notes?.map((e) => Note.fromPartial(e)) || [];
    return message;
  },
};

const baseNote: object = { active: false };

export const Note = {
  encode(message: Note, writer: Writer = Writer.create()): Writer {
    if (message.active === true) {
      writer.uint32(8).bool(message.active);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Note {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNote } as Note;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.active = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Note {
    const message = { ...baseNote } as Note;
    message.active =
      object.active !== undefined && object.active !== null
        ? Boolean(object.active)
        : false;
    return message;
  },

  toJSON(message: Note): unknown {
    const obj: any = {};
    message.active !== undefined && (obj.active = message.active);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Note>, I>>(object: I): Note {
    const message = { ...baseNote } as Note;
    message.active = object.active ?? false;
    return message;
  },
};

const baseInstrument: object = { name: "", octave: "" };

export const Instrument = {
  encode(message: Instrument, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.octave !== "") {
      writer.uint32(18).string(message.octave);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Instrument {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInstrument } as Instrument;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.octave = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Instrument {
    const message = { ...baseInstrument } as Instrument;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.octave =
      object.octave !== undefined && object.octave !== null
        ? String(object.octave)
        : "";
    return message;
  },

  toJSON(message: Instrument): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.octave !== undefined && (obj.octave = message.octave);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Instrument>, I>>(
    object: I
  ): Instrument {
    const message = { ...baseInstrument } as Instrument;
    message.name = object.name ?? "";
    message.octave = object.octave ?? "";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
