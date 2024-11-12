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
