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
