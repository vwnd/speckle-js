import { Base, Chunkable, Detach } from "@speckle/objectsender";

export class Room extends Base {
  speckle_type: string = "Objects.Example.Room";
  name?: string;
  number?: number;
  level?: string;

  @Detach()
  displayValue?: Array<Mesh>;
  constructor(props?: Record<string, unknown>) {
    super(props);
  }
}

export class Collection<T extends Base> extends Base {
  @Detach()
  elements: T[];
  // eslint-disable-next-line camelcase
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

export class Mesh extends Base {
  speckle_type: string = "Objects.Geometry.Mesh";

  @Detach()
  @Chunkable(31250)
  vertices?: number[];

  @Detach()
  @Chunkable(62500)
  faces?: number[];

  // TODO: Colors/Texture
  constructor(props?: Record<string, unknown>) {
    super(props);
  }
}
