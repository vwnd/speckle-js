import dotenv from "dotenv";
import { send } from "./operations";
import { diff } from "./diff";
import { Serializer } from "./serializer";
import data from "./data";
import { ServerTransport } from "./server.transport";
import { config } from "./config";

dotenv.config();

const projectId = "f18f27523f";

const transport = new ServerTransport(
  { serverURL: config.speckle.url, token: config.speckle.token },
  projectId
);

const parsed = data.map((o) => Serializer.parse(o));
const ids = parsed.map((o) => o.id);
const existing = await diff(projectId, ids);
const newObjects = parsed.filter((o) => !existing.includes(o.id));

const objectId = await send(newObjects, projectId);

// TODO: Create Commit
