import { Base } from "@speckle/objectsender";
import { Collection } from "../objects";
import { createLogo } from "./create-logo";

export async function createModel(): Promise<Base> {
  const jsLogo = await createLogo(
    "JavaScript",
    "data/js.json",
    "#323330",
    "#F0DB4F"
  );
  const tsLogo = await createLogo(
    "TypeScript",
    "data/ts.json",
    "#3178C6",
    "#FFFFFF"
  );

  const nodeLogo = await createLogo(
    "Node.js",
    "data/node.json",
    "#339933",
    "#FFFFFF"
  );

  const logosCollection = new Collection("Logo Collection", "logo", [
    jsLogo,
    tsLogo,
    nodeLogo,
  ]);

  const root = new Collection("TypeScript Model", "model", [logosCollection]);

  return root;
}
