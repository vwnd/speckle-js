import { loadData, projectsInfo, sendData } from "./examples";
import { config } from "./utils/config";

async function main() {
  console.log("Speckle for TypeScript/JavaScript Examples");

  await config();

  await projectsInfo();
  await loadData();
  await sendData();
}

main();
