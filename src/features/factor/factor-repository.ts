import * as knexPostgis from "knex-postgis";
import { db, DbTable } from "../../infrastructure/db";
import { FactorDbRow } from "./models/factor-db-row";
import * as turf from "@turf/turf";
import { once } from "lodash";
import { log } from "../../infrastructure/logger";

const st = knexPostgis(db);

export async function getFactors(
  feature: turf.Feature<turf.Polygon>
): Promise<FactorDbRow[]> {
  // const records = await db(DbTable.Factor).select("*", st.asGeoJSON("point"));

  // const factors = records.map((record: any) => {
  //   const point = JSON.parse(record.point);
  //   return { ...record, point };
  // });

  // return factors.filter((x: FactorDbRow) =>
  //   turf.booleanContains(feature, x.point)
  // );

  const factors = await getFactorDbRows();

  return factors.filter(x => turf.booleanContains(feature, x.point));
}

const getFactorDbRows = once(async () => {
  log.info("fetching factors");
  const records = await db(DbTable.Factor).select("*", st.asGeoJSON("point"));
  log.info("finished fetching factors");

  return records.map((record: any) => {
    const point = JSON.parse(record.point);
    return { ...record, point };
  }) as FactorDbRow[];
});
