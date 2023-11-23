import dotenv from "dotenv";
import data from "./data";

import { ServerTransport } from "./server.transport";
import { config } from "./config";
import { Sender } from "./operations";

dotenv.config();

console.time("index.ts");

const projectId = "f18f27523f";

const transport = new ServerTransport(
  { serverURL: config.speckle.url, token: config.speckle.token },
  projectId
);

const objectId = await Sender.send(data, projectId);

console.timeEnd("index.ts");
// TODO: Create Commit
