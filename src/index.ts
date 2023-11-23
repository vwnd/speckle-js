import dotenv from "dotenv";
import data from "./data";

import { ServerTransport } from "./transports";
import { config } from "./config/config";
import { Sender } from "./operations";

dotenv.config();

console.time("index.ts");

const projectId = "f18f27523f";

const transport = new ServerTransport(
  { serverURL: config.speckle.url, token: config.speckle.token },
  projectId
);

const objectId = await Sender.send(data, projectId, [transport]);

console.timeEnd("index.ts");
// TODO: Create Commit
