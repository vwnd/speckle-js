import { Base } from "../model/base";

export interface Transport {
  saveObject(objectId: string, serializedObject: string): any;
}
