import { Base } from "./base";

export class Collection extends Base {
  elements: Base[] = [];

  constructor(
    private readonly name: string,
    private readonly collectionType: string
  ) {
    super();
  }
}
