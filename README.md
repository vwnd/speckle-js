# Speckle for TypeScript Geeks

Welcome to the workshop, we will learn the basics of how to interact with Speckle using the most popular web programming language. We will learn how to get some info from a project using the **GraphQL** API, how to load some data using the `@speckle/objectloader` , how to publish data using the recently added `@speckle/objectsender` library and finally how to use `@speckle/viewer` to view our models.

# Help

You are welcome to write to me at [vwb@shl.dk](mailto:vwb@shl.dk) if you have any questions.

# Setup project

For this session you will need to:

- [ ] Install [Node.js](https://nodejs.org/en).
- [ ] A code editor, I will be using [Visual Studio Code](https://code.visualstudio.com/).
- [ ] A [Speckle](https://app.speckle.systems/) account.

Now that you have everything installed. Let’s start a Javascript/Typescript project.

- [ ] Create an empty folder called `speckle-js`
- [ ] Open that folder using your preferred code editor.
- [ ] In a terminal, type `npm init -y` to start a project.

Setting up Typescript.

- [ ] Install Typescript and tsx by running `npm install -D typescript tsx @types/node`
- [ ] Initialize a Typescript configuration file running `npx tsc —-init`

# 1. Project Information

The easiest way to get information about a project is through the GraphQL API. You will have access to project name, collaborators, models, and update dates.

<aside>
💡

What’s GraphQL is a query language for an API. It makes API discoverable, typed and allows for clients to fetch finely grained data with a graph like approach.

</aside>

Let’s start by sketching our first query on the [Speckle GraphQL Apollo Studio](https://app.speckle.systems/graphql). Make sure you have logged in on Speckle before trying.

```graphql
query UserProjects {
  activeUser {
    projects {
      items {
        name
        description
        id
        role
      }
    }
  }
}
```

Let’s move to TypeScript and learn how to use that query.

- [ ] Install the `dotenv` running `npm i dotenv` library and configure it on index.ts

```tsx
export async function projectsInfo() {
  const query = `#graphql
  query UserProjects {
      activeUser {
        projects {
          items {
            name
            description
            id
            role
          }
        }
      }
    }
  `;

  const response = await fetch("https://app.speckle.systems/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SPECKLE_TOKEN as string}`,
    },
    body: JSON.stringify({ query }),
  });

  const parsed = await response.json();

  const projects = parsed.data.activeUser.projects.items;

  console.log(projects);
}
```

### Good to know

1. Developing against a GraphQL API using the native fetch API can be easier using clients built specifically for GraphQL. Check out [Apollo](https://www.apollographql.com/), [graphql-request](https://www.npmjs.com/package/graphql-request) or other options.
2. GraphQL APIs are fully typed and there are solutions to build TypeScript types automatically so that your queries become even easier. Have a look at [GraphQL Codegen](https://the-guild.dev/graphql/codegen).

# 2 - Load Data

On this exercise we will see how to load data from Speckle using the `@speckle/objectloader` library. Let’s see if we manage to calculate the total area on the model below.

<iframe title="Speckle" src="https://app.speckle.systems/projects/9ff253b70b/models/f09b6887fc#embed=%7B%22isEnabled%22%3Atrue%7D" width="600" height="400" frameborder="0"></iframe>

To use the object loader, we will need to pieces of information, an **object id** and the **project id** to which this object belongs. We can inspect this model version and get the root object id we would like to load.

- Object ID: d8f03ed8f1de1a9697bfd85c2f18fd35
- Project ID: 9ff253b70b

Let’s write a function that loads the object above.

```tsx
import ObjectLoader from "@speckle/objectloader";

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
}
```

- Calculate total area

  ```tsx
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
  ```

We will make use of the `@speckle/objectsender` library to make our own sender. Let’s look at some basic objects we can create using it.

### The Simplest Message

```tsx
const message = new Base({
  message:
    "A wizard is never late, nor is he early, he arrives precisely when he means to.",
  author: "Gandalf, the Grey",
});

const result = await send(message, {
  projectId,
  serverUrl: "https://app.speckle.systems/",
  token: process.env.SPECKLE_TOKEN as string,
});

console.log("Object sent with ID:", result.hash);
```

### Making this object a version

For Speckle to make start making use of the message we just sent, we need to create a version using that object as the root of our version.

- _create-version.ts_

  ```tsx
  import { SendResult } from "@speckle/objectsender";

  interface CreateVersionParams {
    serverUrl: string;
    projectId: string;
    modelId: string;
    token: string;
  }

  export async function createVersion(
    res: SendResult,
    { serverUrl, projectId, modelId, token }: CreateVersionParams
  ) {
    const response = await fetch(serverUrl + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `#graphql
          mutation CreateVersion($input: CreateVersionInput!) {
            versionMutations {
              create(input: $input) {
                id
              }
            }
          }
        `,
        variables: {
          input: {
            projectId,
            modelId,
            objectId: res.hash,
            message: `Hello from Javascript!`,
          },
        },
      }),
    });

    return (await response.json()).data.versionMutations.create;
  }
  ```

```tsx
const version = await createVersion(result, {
  modelId,
  projectId,
  serverUrl: "https://app.speckle.systems",
  token: process.env.SPECKLE_TOKEN as string,
});
```

### Implementing Mesh

To be able to visualize your objects you will need to create Meshes. Let’s make an implementation of the Objects.Geometry.Mesh class from the Objects .NET library.

https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Geometry/Mesh.cs

```tsx
import { Base, Chunkable, Detach } from "@speckle/objectsender";

export class Mesh extends Base {
  speckle_type: string = "Objects.Geometry.Mesh";

  @Detach()
  @Chunkable(31250)
  vertices?: number[];

  @Detach()
  @Chunkable(62500)
  faces?: number[];

  @Detach()
  @Chunkable(62500)
  colors?: number[] = [];

  @Detach()
  @Chunkable(31250)
  textureCoordinates?: number[] = [];

  units?: string = "";

  constructor(props?: Record<string, unknown>) {
    super(props);
  }
}
```

### Adding a Render Material to our Mesh

To exercise what we learned, we will implement another useful object type, Render Material. Adding a render material will affect how our mesh object is displayed on the Speckle Viewer.

```tsx
import { Base } from "@speckle/objectsender";
import { hexToArgb } from "hex-argb-converter";

const yellow = 4294299970;
const black = 4278190080;
const lightGray = 0;

export class RenderMaterial extends Base {
  speckle_type: string = "Objects.Other.RenderMaterial";

  name?: string;
  opacity: number = 1;
  metalness: number = 0;
  roughness: number = 1;
  diffuse: number = 4292072403;
  emissive: number = 4278190080;

  constructor(props?: Record<string, unknown>) {
    super(props);
  }
}
```

### Putting things together

Some sample data can be found here: https://github.com/vwnd/speckle-js/tree/dev/data

```tsx
import { Base, send } from "@speckle/objectsender";
import { createVersion } from "./utils/create-version";
import { readFileSync } from "fs";
import { Mesh } from "./utils/mesh";
import { RenderMaterial } from "./utils/render-material";
import { hexToArgb } from "hex-argb-converter";

const projectId = "9ff253b70b";
const modelId = "31fdd47483";

export async function sendData() {
  console.log("3 - Send Data");

  var data = JSON.parse(readFileSync("data/js.json", "utf-8"));
  const foregroundGeometry = data.fg;
  const backgroundGeometry = data.bg;

  const fgMesh = new Mesh();
  fgMesh.vertices = foregroundGeometry.vertices;
  fgMesh.faces = foregroundGeometry.faces;
  fgMesh.colors = foregroundGeometry.colors;
  fgMesh.textureCoordinates = foregroundGeometry.textureCoordinates;

  const fgMaterial = new RenderMaterial();
  fgMaterial.name = "JavaScript Foreground";
  fgMaterial.diffuse = hexToArgb("#323330");
  fgMaterial.metalness = 1;
  fgMaterial.roughness = 0.05;

  fgMesh.renderMaterial = fgMaterial;

  const bgMesh = new Mesh();
  bgMesh.vertices = backgroundGeometry.vertices;
  bgMesh.faces = backgroundGeometry.faces;
  bgMesh.colors = backgroundGeometry.colors;
  bgMesh.textureCoordinates = backgroundGeometry.textureCoordinates;

  const bgMaterial = new RenderMaterial();
  bgMaterial.name = "JavaScript Background";
  bgMaterial.diffuse = hexToArgb("#F0DB4F");
  bgMaterial.roughness = 0.05;

  bgMesh.renderMaterial = bgMaterial;

  const message = new Base({
    speckle_type: "TypeScript.Model",
    name: "JavaScript Model",
    displayValue: [fgMesh, bgMesh],
  });

  const result = await send(message, {
    projectId,
    serverUrl: "https://app.speckle.systems/",
    token: process.env.SPECKLE_TOKEN as string,
  });

  console.log("Object sent with ID:", result.hash);

  const version = await createVersion(result, {
    modelId,
    projectId,
    serverUrl: "https://app.speckle.systems",
    token: process.env.SPECKLE_TOKEN as string,
  });

  console.log("Version created with ID:", version.id);
}
```

### (Optional) Implementing Collections

Whether to represent Layers, Categories, Tags, Collections, Groups, or hierarchical containers, it is common to see a natural grouping of objects within a 3D model. The `Collection` type provides a unified way to represent hierarchical collections of Speckle objects.

```tsx
export class Collection<T extends Base> extends Base {
  @Detach()
  elements: T[];
  speckle_type = "Speckle.Core.Models.Collection";

  constructor(
    name: string,
    collectionType: string,
    elements: T[] = [],
    props?: Record<string, unknown>
  ) {
    super(props);
    this.name = name;
    this.collectionType = collectionType;
    this.elements = elements;
  }
}
```
