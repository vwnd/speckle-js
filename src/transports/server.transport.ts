import { Base } from "../model/base";
import { Transport } from "./transport";

interface Account {
  serverURL: string;
  token: string;
}

export class ServerTransport implements Transport {
  constructor(
    private readonly account: Account,
    private readonly projectId: string
  ) {}

  saveObject(object: Base) {
    throw new Error("Method not implemented.");
  }
}
