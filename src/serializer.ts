import crypto from "crypto";
import { Base } from "./model/base";

export class Serializer {
  static parse(data: object) {
    const id = this.hash(data).substring(0, 32);

    const result: Base = {
      ...data,
      id,
    };

    return result;
  }

  private static hash(data: any) {
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");

    return hash;
  }
}
