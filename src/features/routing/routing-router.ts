import * as Router from "koa-router";
import * as controller from "./routing-controller";
export const routingRouter = new Router({ prefix: "/routing" });

routingRouter.get("/", controller.getRoute);
