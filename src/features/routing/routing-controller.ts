import * as koa from "koa";
import * as hereGateway from "../../gateways/here-maps-gateway";
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
    return `${position.Latitude},${position.Longitude}`;
  });

  const result = await hereGateway.getRouteFromHere(
    `geo!${geocode1}`,
    `geo!${geocode2}`,
    `fastest;car;traffic:disabled`
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
