import * as koa from "koa";
export async function getRoute(ctx: koa.Context) {
  ctx.body = {
    message: "man I hope these are correct"
  };
}
