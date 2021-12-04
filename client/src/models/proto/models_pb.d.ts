// package: 
// file: proto/models.proto

import * as jspb from "google-protobuf";

export class Person extends jspb.Message {
  hasName(): boolean;
  clearName(): void;
  getName(): string;
  setName(value: string): void;

  hasId(): boolean;
  clearId(): void;
  getId(): number;
  setId(value: number): void;

  hasEmail(): boolean;
  clearEmail(): void;
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Person.AsObject;
  static toObject(includeInstance: boolean, msg: Person): Person.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Person, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Person;
  static deserializeBinaryFromReader(message: Person, reader: jspb.BinaryReader): Person;
}

export namespace Person {
  export type AsObject = {
    name: string,
    id: number,
    email: string,
  }
}

