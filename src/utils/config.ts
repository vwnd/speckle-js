import "dotenv/config";

export async function config() {
  const SPECKLE_TOKEN = process.env.SPECKLE_TOKEN;
  if (!SPECKLE_TOKEN) {
    throw new Error("SPECKLE_TOKEN is not defined.");
  }
}
