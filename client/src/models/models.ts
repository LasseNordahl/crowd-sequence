/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

export interface Person {
  name?: string | undefined;
  id?: number | undefined;
  email?: string | undefined;
}

const basePerson: object = {};

export const Person = {
  encode(message: Person, writer: Writer = Writer.create()): Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== undefined) {
      writer.uint32(16).int32(message.id);
    }
    if (message.email !== undefined) {
      writer.uint32(26).string(message.email);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Person {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePerson } as Person;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.id = reader.int32();
          break;
        case 3:
          message.email = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Person {
    const message = { ...basePerson } as Person;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : undefined;
    message.id =
      object.id !== undefined && object.id !== null
        ? Number(object.id)
        : undefined;
    message.email =
      object.email !== undefined && object.email !== null
        ? String(object.email)
        : undefined;
    return message;
  },

  toJSON(message: Person): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = message.id);
    message.email !== undefined && (obj.email = message.email);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Person>, I>>(object: I): Person {
    const message = { ...basePerson } as Person;
    message.name = object.name ?? undefined;
    message.id = object.id ?? undefined;
    message.email = object.email ?? undefined;
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
