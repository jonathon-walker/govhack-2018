import { FactorKind } from "./factor-kind";
import { Point } from "../../../infrastructure/db";
import { Omit } from "../../shared/omit";

export interface FactorDbRow {
  id: number;
  kind: FactorKind;
  coordinates: string;
  impact: number | null;
}

export type NewFactorDbRow = Omit<FactorDbRow, "id">;
