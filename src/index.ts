import { loadData, projectsInfo, sendData } from "./examples";
import { config } from "./utils/config";

async function main() {
  console.log("Speckle for TypeScript/JavaScript Examples");

  const { runLoadData, runProjectsInfo, runSendData } = config();

  if (runProjectsInfo) await projectsInfo();
  if (runLoadData) await loadData();
  if (runSendData) await sendData();
}

main();
