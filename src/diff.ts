import { config } from "./config";

const {
  speckle: { url, token },
} = config;

export async function diff(projectId: string, ids: string[]) {
  const response = await fetch(`${url}/api/diff/${projectId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      objects: JSON.stringify(ids),
    }),
  });
  if (!response.ok) {
    throw new Error("Diff failed.");
  }
  const data = await response.json();
  const existing = Object.keys(data).filter((key) => data[key] === true);
  const nonExisting = Object.keys(data).filter((key) => data[key] === false);

  return existing;
}
