import * as koa from "koa";
import UI from "./uid";
import main from "./ui/main";

export const app = new koa();
app.use(async ctx => {
  ctx.body = main();
});
