import { FactorKind } from "./factor-kind";
import { Omit } from "../../shared/omit";
import { Feature, Point } from "@turf/turf";

export interface FactorDbRow {
  id: number;
  kind: FactorKind;
  point: Feature<Point>;
  impact: number | null;
}

export type NewFactorDbRow = Omit<FactorDbRow, "id">;
