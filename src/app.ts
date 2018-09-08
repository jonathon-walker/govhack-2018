import * as koa from "koa";
import * as Router from "koa-router";
export const app = new koa();
const router = new Router();

import { routingRouter } from "./features/routing/routing-router";
router.get("/", ctx => {
  ctx.status = 200;
  ctx.body = "govhack2018";
});
app.use(router.routes());
app.use(routingRouter.routes());
app.use(router.allowedMethods());
