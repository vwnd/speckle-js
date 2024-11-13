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
