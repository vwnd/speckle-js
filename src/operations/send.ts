import { Serializer } from "../serializer";

const speckleURL = process.env.SPECKLE_URL as string;
const speckleToken = process.env.SPECKLE_TOKEN;

export async function send(data: any[], projectId: string) {
  if (data.length <= 0) return;

  const parsedData = data.map((o) => Serializer.parse(o));

  const jsonString = JSON.stringify(parsedData);

  const jsonBlob = new Blob([jsonString], { type: "application/json" });

  const formData = new FormData();
  formData.append("file", jsonBlob, "data.json");

  /**
   * Upload object
   */
  const response = await fetch(`${speckleURL}/objects/${projectId}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${speckleToken}`,
    },
  });

  if (response.status !== 201) {
    throw new Error("Failed to upload object");
  }

  console.log("Response status: " + response.status);
}
