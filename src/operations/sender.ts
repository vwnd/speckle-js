import { Serializer } from "../serialisation/serializer";
import { diff } from "../utils/diff";
import { Base } from "../model/base";
import { ServerTransport } from "../transports/server.transport";

export class Sender {
  private static readonly speckleURL = process.env.SPECKLE_URL as string;
  private static readonly speckleToken = process.env.SPECKLE_TOKEN;

  public static async send(
    data: any,
    projectId: string,
    transports: ServerTransport[]
  ) {
    const serializer = new Serializer();
    const serialized = serializer.serialize(data);
    //   const parsed = data.map((o: any): Base => Serializer.parse(o));
    //   const ids = parsed.map((o: Base) => o.id);
    //   const existing = await diff(projectId, ids);
    //   const objectsToSend = parsed.filter((o: any) => !existing.includes(o.id));
    //   if (objectsToSend.length <= 0) return;
    //   console.time("Send");
    //   const parsedData = objectsToSend.map((o: any) => Serializer.parse(o));
    //   const jsonString = JSON.stringify(parsedData);
    //   const jsonBlob = new Blob([jsonString], { type: "application/json" });
    //   const formData = new FormData();
    //   formData.append("file", jsonBlob, "data.json");
    //   /**
    //    * Upload object
    //    */
    //   const response = await fetch(`${this.speckleURL}/objects/${projectId}`, {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       Authorization: `Bearer ${this.speckleToken}`,
    //     },
    //   });
    //   if (response.status !== 201) {
    //     throw new Error("Failed to upload object");
    //   }
    //   console.log("Response status: " + response.status);
    //   console.timeEnd("Send");
  }
}
