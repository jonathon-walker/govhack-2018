import * as turf from "@turf/turf";
import * as config from "config";
import { calculateImpact } from "./impact-calculator";
import { log } from "../../infrastructure/logger";

const SCALE_FACTOR = config.get<number>("danger-area.scale-factor");
const IMPACT_THRESHOLD = config.get<number>("danger-area.impact-threshold");

export interface GetDangerAreasDto {
  from: turf.Position;
  to: turf.Position;
}

export function getDangerAreas(dto: GetDangerAreasDto) {
  const line = turf.lineString([dto.from, dto.to]);
  const scaledLine = turf.transformScale(line, SCALE_FACTOR);
  const searchGrid = turf.squareGrid(turf.bbox(scaledLine), 50);
  return searchGrid.features.filter(isDangerous).map(x => x.geometry!);
}

export async function isDangerous(feature: turf.Feature<turf.Polygon>) {
  const impact = await calculateImpact(feature);
  return impact > IMPACT_THRESHOLD;
}

import "source-map-support/register";

const areas = getDangerAreas({
  from: [142.3885, -36.0263],
  to: [140.3885, -35.0263]
});
