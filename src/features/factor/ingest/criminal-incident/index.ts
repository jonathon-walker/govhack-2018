import csv = require("csvtojson");
import path = require("path");
import { NewFactorDbRow } from "../../models/factor-db-row";
import { FactorKind } from "../../models/factor-kind";
import { times, flatten, flattenDeep } from "lodash";
import * as turf from "@turf/turf";

interface CriminalIncidentSummaryRow {
  local_government_area: string;
  rate_per_100000_population: number;
  latitude: number;
  longitude: number;
  incidents_recorded: number;
}

export async function getNewFactors(): Promise<NewFactorDbRow[]> {
  const converter = csv({ delimiter: "\t" });

  const summaryFactors = converter
    .fromFile(path.join(__dirname, "summary.tsv"))
    .then(records => flatten(records.map(fromSummaryRow)));

  const detailFactors = Promise.resolve<NewFactorDbRow[]>([]);

  return flattenDeep(await Promise.all([summaryFactors, detailFactors]));
}

function fromSummaryRow(row: CriminalIncidentSummaryRow): NewFactorDbRow[] {
  return times(row.incidents_recorded, () => ({
    kind: FactorKind.CriminalIncident,
    point: turf.point([row.longitude, row.latitude]),
    impact: null
  }));
}
