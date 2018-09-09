import * as knexPostgis from "knex-postgis";
import { db, DbTable } from "../../infrastructure/db";
import { FactorDbRow } from "./models/factor-db-row";
import * as turf from "@turf/turf";

const st = knexPostgis(db);

// export function getFactors(polygon: turf.Polygon): Promise<FactorDbRow[]> {
//   const boundary = st.geomFromGeoJSON(polygon);
// }
