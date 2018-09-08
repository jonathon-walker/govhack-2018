import * as koa from "koa";

export const app = new koa();
app.use(async ctx => {
  ctx.body = {
    status: "success",
    message: "govhack 2018"
  };
});
