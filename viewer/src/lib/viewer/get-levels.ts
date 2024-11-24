import type { Viewer } from "@speckle/viewer";

export interface Level {
  id: string;
  name: string;
  elevation: {
    value: number;
    units: string;
  };
}

export function getLevels(viewer: Viewer): Level[] {
  const nodeWithLevels = viewer.getWorldTree().findAll((node) => {
    if (!node.model.raw.speckle_type) return false;

    if (node.model.raw.level) return true;
    return false;
  });

  const levelsRecord: Record<string, Level> = {};

  nodeWithLevels.forEach((node) => {
    const levelRaw = node.model.raw.level;

    const level: Level = {
      id: levelRaw.id,
      name: levelRaw.name,
      elevation: {
        value: levelRaw.elevation,
        units: levelRaw.units,
      },
    };

    levelsRecord[levelRaw.id] = level;
  });

  const levels = Object.values(levelsRecord);

  return levels;
}
