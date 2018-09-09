import * as koa from "koa";
import * as hereGateway from "../../gateways/here-maps-gateway";
import { getDangerAreas } from "../danger-area/danger-area-service";
import { log } from "../../infrastructure/logger";
export async function getRoute(ctx: koa.Context, next: () => Promise<any>) {
  const start = ctx.request.query.start;
  const end = ctx.request.query.end;
  const [resp1, resp2] = await Promise.all([
    hereGateway.geocodeAddress(start),
    hereGateway.geocodeAddress(end)
  ]);
  const [geocode1, geocode2] = [resp1, resp2].map(resp => {
    const data = resp.Response;
    const geocodeFailed = !data.View || !data.View[0].Result;
    if (geocodeFailed) {
      throw new Error(`failed to geocode ${JSON.stringify(data)}`);
    }
    const position = data.View[0].Result[0].Location.DisplayPosition;
    return {
      lat: position.Latitude,
      lng: position.Longitude
    };
  });

  const dangerAreas = getDangerAreas({
    from: [geocode1.lng, geocode1.lat],
    to: [geocode2.lng, geocode2.lat]
  });
  const result = await hereGateway.getRouteFromHere(
    `geo!${geocode1.lat},${geocode1.lng}`,
    `geo!${geocode2.lat},${geocode2.lng}`,
    `fastest;car;traffic:disabled`,
    "52.517100760,13.3905424488;52.5169701849,13.391808451"
  );
  if (result.type === "ApplicationError") {
    throw new Error(
      `failed to retrieve from here maps ${JSON.stringify(result)}`
    );
  }
  ctx.body = result;
  ctx.set("Access-Control-Allow-Origin", "*");
  return next();
}
