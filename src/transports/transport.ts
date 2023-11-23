import { Base } from "../model/base";

export interface Transport {
  saveObject(object: Base): any;
}
