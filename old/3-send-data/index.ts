import "dotenv/config";
import { Base, send } from "@speckle/objectsender";
import { Room } from "./lib";
import { createVersion } from "./create-version";
import { createCube } from "./create-cube";

async function sendData() {
  // 1. Create data
  const object = new Base({
    speckle_type: "SpeckleCon.Data",
    name: "Room",
    number: 101,
  });

  const room = new Room();
  room.name = "Room";
  room.level = "Level 1";
  room.number = 101;
  room.displayValue = [createCube()];

  // 2. Send data
  const result = await send(room, {
    projectId: "09c17a606e",
    serverUrl: "https://app.speckle.systems/",
    token: process.env.SPECKLE_TOKEN as string,
  });
  console.log("Object sent with hash:", result.hash);

  // 3. Create version
  const version = await createVersion(result, {
    modelId: "c205848608",
    projectId: "09c17a606e",
    serverUrl: "https://app.speckle.systems",
    token: process.env.SPECKLE_TOKEN as string,
  });

  console.log("Version created", version);
}

sendData()
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(error.message);
  });
