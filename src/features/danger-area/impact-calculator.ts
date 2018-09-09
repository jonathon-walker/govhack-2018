import * as turf from "@turf/turf";
import * as repo from "../factor/factor-repository";
import { FactorKind } from "../factor/models/factor-kind";
import * as config from "config";

const FACTOR_IMPACT_DEFAULTS = config.get<Record<FactorKind, number>>(
  "factor-impact-defaults"
);

export async function calculateImpact(
  feature: turf.Feature<turf.Polygon>
): Promise<number> {
  const factors = await repo.getFactors(feature);

  return factors.reduce((result, factor) => {
    const impact = factor.impact || FACTOR_IMPACT_DEFAULTS[factor.kind];
    return (result += impact);
  }, 0);
}
