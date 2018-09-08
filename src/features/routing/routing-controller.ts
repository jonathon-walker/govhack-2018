import * as koa from "koa";
import * as hereGateway from "../../gateways/here-maps-gateway";

export async function getRoute(ctx: koa.Context, next: () => Promise<any>) {
  const result = await hereGateway.getRouteFromHere(
    `geo!52.5,13.4`,
    `geo!52.5,13.5`,
    `fastest;car;traffic:disabled`
  );
  if (result.type === "ApplicationError") {
    throw new Error(
      `failed to retrieve from here maps ${JSON.stringify(result)}`
    );
  }
  ctx.body = result;
  return next();
}
