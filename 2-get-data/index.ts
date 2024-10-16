import ObjectLoader from "@speckle/objectloader";

async function getData(projectId: string, objectId: string) {
  const loader = new ObjectLoader({
    serverUrl: "https://app.speckle.systems",
    streamId: projectId,
    objectId: objectId,
    options: {
      customLogger: () => {},
      excludeProps: ["__closure"],
    },
  });

  // const object = await loader.getAndConstructObject(() => {});

  // if (Array.isArray(object)) {
  //   console.log("Object is an array");
  // } else {
  //   console.log(object);
  // }

  for await (const object of loader.getObjectIterator()) {
    if ((object.speckle_type as string).includes("Room")) {
      console.log("Room:", object.name);
    }
  }
}

getData("09c17a606e", "29cbfe11e068518889d088d9d7496c88")
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(error.message);
  });
