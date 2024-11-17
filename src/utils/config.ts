import "dotenv/config";

export function config() {
  const SPECKLE_TOKEN = process.env.SPECKLE_TOKEN;
  if (!SPECKLE_TOKEN) {
    throw new Error("SPECKLE_TOKEN is not defined.");
  }

  const args = process.argv.slice(2);

  let runProjectsInfo = false;
  let runLoadData = false;
  let runSendData = false;

  if (args.length > 0) {
    args.includes("1") ? (runProjectsInfo = true) : null;
    args.includes("2") ? (runLoadData = true) : null;
    args.includes("3") ? (runSendData = true) : null;
  } else {
    runProjectsInfo = true;
    runLoadData = true;
    runSendData = true;
  }

  return {
    runProjectsInfo,
    runLoadData,
    runSendData,
  };
}
