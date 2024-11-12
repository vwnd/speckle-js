import ObjectLoader from "@speckle/objectloader";
import dotenv from "dotenv/config";

const projectId = "9ff253b70b";
const objectId = "d8f03ed8f1de1a9697bfd85c2f18fd35";

export async function loadData() {
  const loader = new ObjectLoader({
    objectId,
    token: process.env.SPECKLE_TOKEN as string,
    serverUrl: "https://app.speckle.systems",
    streamId: projectId,
    options: {
      excludeProps: ["__closure"],
    },
  });

  const model: any = await loader.getAndConstructObject(() => undefined);

  console.log(model);

  // TODO: Calculate the total area sum of the rooms in the model.
  calculateTotalArea(model);
}

function calculateTotalArea(model: any) {
  const roomsCollection = model.elements[0];
  const rooms = roomsCollection.elements;

  let totalArea = 0;
  const units = rooms[0].units;
  for (const room of rooms) {
    totalArea += room.area;
  }

  console.log(`Total area: ${(totalArea as number).toFixed(2)} ${units}`);
}
