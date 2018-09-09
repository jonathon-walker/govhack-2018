import { NewFactorDbRow } from "../models/factor-db-row";
import * as criminalIncident from "./criminal-incident";
import { db, st, DbTable } from "../../../infrastructure/db";
import { log } from "../../../infrastructure/logger";
import { flatten } from "lodash";

export interface NewFactorDataSource {
  getNewFactors(): Promise<NewFactorDbRow[]>;
}

export async function ingestData(): Promise<void> {
  const sources: NewFactorDataSource[] = [criminalIncident];
  const newFactorPromises = sources.map(x => x.getNewFactors());
  const newFactors = flatten(await Promise.all(newFactorPromises));

  const records = newFactors.map(factor => ({
    ...factor,
    point: st.geomFromGeoJSON(factor.point)
  }));

  log.info("starting ingest", { records: records.length });
  await db.batchInsert(DbTable.Factor, records);
  log.info("finished ingest");
}
