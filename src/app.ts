import * as koa from "koa";
import * as Router from "koa-router";
import { log } from "./infrastructure/logger";
export const app = new koa();
const router = new Router();

import { routingRouter } from "./features/routing/routing-router";
router.get("/", (ctx, next) => {
  ctx.status = 200;
  ctx.body = "govhack2018";
  return next();
});
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = `err ${err}`;
    log.info("ERR", err.data);
  }
});
app.use(router.routes());
app.use(routingRouter.routes());
app.use(router.allowedMethods());
