import { send } from "@speckle/objectsender";
import { createModel } from "../utils/create-model";
import { createVersion } from "../utils/create-version";

const projectId = "9ff253b70b";
const modelId = "31fdd47483";

export async function sendData() {
  console.log("3 - Send Data");

  const model = await createModel();

  const t0 = performance.now();
  const result = await send(model, {
    projectId,
    serverUrl: "https://app.speckle.systems/",
    token: process.env.SPECKLE_TOKEN as string,
  });
  const t1 = performance.now();
  console.log("Data sent in", (t1 - t0).toFixed(2), "ms");

  console.log("Object sent with ID:", result.hash);

  const version = await createVersion(result, {
    modelId,
    projectId,
    serverUrl: "https://app.speckle.systems",
    token: process.env.SPECKLE_TOKEN as string,
  });

  console.log("Version created with ID:", version.id);
}
