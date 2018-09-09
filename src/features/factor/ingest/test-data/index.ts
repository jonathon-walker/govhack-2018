import { NewFactorDbRow } from "../../models/factor-db-row";
import csvtojson = require("csvtojson");
import path = require("path");
import * as turf from "@turf/turf";

export async function getNewFactors(): Promise<NewFactorDbRow[]> {
  const converter = csvtojson();
  const rows = await converter.fromFile(path.join(__dirname, "data.csv"));

  return rows.map(row => {
    const point = turf.point([
      parseFloat(row.longitude),
      parseFloat(row.latitude)
    ]);

    return {
      kind: row.kind,
      point: point.geometry!,
      impact: parseInt(row.impact)
    };
  });
}
