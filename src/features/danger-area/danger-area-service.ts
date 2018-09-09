import * as turf from "@turf/turf";
import * as config from "config";
import { calculateImpact } from "./impact-calculator";
import { log } from "../../infrastructure/logger";

const SCALE_FACTOR = config.get<number>("danger-area.scale-factor");
const IMPACT_THRESHOLD = config.get<number>("danger-area.impact-threshold");
const SEARCH_CELL_SIDE_IN_KM = config.get<number>(
  "danger-area.search-cell-side-in-km"
);

export interface GetDangerAreasDto {
  from: turf.Position;
  to: turf.Position;
}

export function getDangerAreas(dto: GetDangerAreasDto) {
  const line = turf.lineString([dto.from, dto.to]);
  const scaledLine = turf.transformScale(line, SCALE_FACTOR);
  const searchGrid = turf.squareGrid(
    turf.bbox(scaledLine),
    SEARCH_CELL_SIDE_IN_KM
  );
  return searchGrid.features
    .filter(isDangerous)
    .map(x => turf.bbox(x.geometry!));
}

export async function isDangerous(feature: turf.Feature<turf.Polygon>) {
  const impact = await calculateImpact(feature);
  return impact > IMPACT_THRESHOLD;
}

import "source-map-support/register";

const areas = getDangerAreas({
  from: [143.3885, -37.0263],
  to: [141.3885, -35.0263]
});
