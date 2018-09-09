import * as knexPostgis from "knex-postgis";
import { db, DbTable } from "../../infrastructure/db";
import { FactorDbRow } from "./models/factor-db-row";
import * as turf from "@turf/turf";

const st = knexPostgis(db);

export async function getFactors(
  feature: turf.Feature<turf.Polygon>
): Promise<FactorDbRow[]> {
  const factors = await db(DbTable.Factor).select("*", st.asGeoJSON("point"));
  // .whereRaw(
  //   `ST_contains(${st.geomFromGeoJSON(feature)}, ${st.asText("point")})`
  // );

  return factors.map((factor: any) => {
    const point = JSON.parse(factor.point);
    return { ...factor, point };
  });
}
