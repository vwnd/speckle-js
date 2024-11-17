import { Base, Detach } from "@speckle/objectsender";
import { readFileSync } from "fs";
import { hexToArgb } from "hex-argb-converter";
import { Mesh, RenderMaterial } from "../objects";

class Logo extends Base {
  name?: string;

  @Detach()
  displayValue: Mesh[] = [];

  constructor(props?: Record<string, unknown>) {
    super(props);
  }
}

export async function createLogo(
  name: string,
  filePath: string,
  fgColor: string,
  bgColor: string
): Promise<Logo> {
  var data = JSON.parse(readFileSync(filePath, "utf-8"));
  const foregroundGeometry = data.fg;
  const backgroundGeometry = data.bg;

  const fgMesh = new Mesh();
  fgMesh.vertices = foregroundGeometry.vertices;
  fgMesh.faces = foregroundGeometry.faces;
  fgMesh.colors = foregroundGeometry.colors;
  fgMesh.textureCoordinates = foregroundGeometry.textureCoordinates;

  const fgMaterial = new RenderMaterial();
  fgMaterial.name = "Logo Foreground";
  fgMaterial.diffuse = hexToArgb(fgColor);
  fgMaterial.roughness = 0.5;

  fgMesh.renderMaterial = fgMaterial;

  const bgMesh = new Mesh();
  bgMesh.vertices = backgroundGeometry.vertices;
  bgMesh.faces = backgroundGeometry.faces;
  bgMesh.colors = backgroundGeometry.colors;
  bgMesh.textureCoordinates = backgroundGeometry.textureCoordinates;

  const bgMaterial = new RenderMaterial();
  bgMaterial.name = "Logo Background";
  bgMaterial.diffuse = hexToArgb(bgColor);
  bgMaterial.roughness = 0.5;

  bgMesh.renderMaterial = bgMaterial;

  const logo = new Logo();
  logo.name = name;
  logo.displayValue.push(fgMesh, bgMesh);

  return logo;
}
