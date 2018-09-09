import * as turf from "@turf/turf";
import * as config from "config";
import { calculateImpact } from "./impact-calculator";

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
  return searchGrid.features.filter(isDangerous);
}

export async function isDangerous(feature: turf.Feature<turf.Polygon>) {
  const impact = await calculateImpact(feature);
  return impact > IMPACT_THRESHOLD;
}
