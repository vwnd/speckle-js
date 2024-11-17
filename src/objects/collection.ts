import { Base, Detach } from "@speckle/objectsender";

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
