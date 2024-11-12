import { Base, send } from "@speckle/objectsender";
import { createVersion } from "./utils/create-version";

const projectId = "9ff253b70b";
const modelId = "31fdd47483";

export async function sendData() {
  console.log("3 - Send Data");

  const message = new Base({
    message:
      "A wizard is never late, nor is he early, he arrives precisely when he means to.",
    author: "Gandalf, the Grey",
  });

  const result = await send(message, {
    projectId,
    serverUrl: "https://app.speckle.systems/",
    token: process.env.SPECKLE_TOKEN as string,
  });

  console.log("Object sent with ID:", result.hash);

  const version = await createVersion(result, {
    modelId,
    projectId,
    serverUrl: "https://app.speckle.systems",
    token: process.env.SPECKLE_TOKEN as string,
  });

  console.log("Version created with ID:", version.id);
}
