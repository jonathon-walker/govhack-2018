import * as koa from "koa";

export const app = new koa();
app.use(async ctx => {
  ctx.body = {
    status: "success",
    message: "Govhack 2019"
  };
});
