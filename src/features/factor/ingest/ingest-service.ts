import { NewFactorDbRow } from "../models/factor-db-row";
import * as criminalIncident from "./criminal-incident";
import * as testData from "./test-data";
import { db, st, DbTable } from "../../../infrastructure/db";
import { log } from "../../../infrastructure/logger";
import { flatten, take } from "lodash";

export interface NewFactorDataSource {
  getNewFactors(): Promise<NewFactorDbRow[]>;
}

export async function ingestData(): Promise<void> {
  const sources: NewFactorDataSource[] = [criminalIncident, testData];
  const newFactorPromises = sources.map(x => x.getNewFactors());
  const newFactors = flatten(await Promise.all(newFactorPromises));

  const records = newFactors.map(factor => {
    const geometry = factor.point;
    const pointWkt = `Point(${geometry.coordinates.join(" ")})`;

    return {
      ...factor,
      point: st.geomFromText(pointWkt, 4326)
    };
  });

  log.info("starting ingest", { records: records.length });
  await db.batchInsert(DbTable.Factor, records);
  log.info("finished ingest");
}
