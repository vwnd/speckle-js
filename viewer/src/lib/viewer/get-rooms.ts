import type { Viewer } from "@speckle/viewer";

export function getRooms(viewer: Viewer) {
  return viewer.getWorldTree().findAll((node) => {
    if (!node.model.raw.speckle_type) return;
    return node.model.raw.speckle_type.includes("Room");
  });
}
