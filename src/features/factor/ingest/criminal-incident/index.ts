import csv = require("csvtojson");
import path = require("path");
import { NewFactorDbRow } from "../../models/factor-db-row";
import { FactorKind } from "../../models/factor-kind";
import { times, flatten, flattenDeep } from "lodash";
import * as turf from "@turf/turf";

interface CriminalIncidentSummaryRow {
  local_government_area: string;
  rate_per_100000_population: string;
  latitude: string;
  longitude: string;
  incidents_recorded: string;
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
  return times(parseInt(row.incidents_recorded), () => ({
    kind: FactorKind.CriminalIncident,
    point: turf.point([parseFloat(row.longitude), parseFloat(row.latitude)]),
    impact: null
  }));
}
