import * as config from "config";
import { app } from "./src/app";
import { log } from "./src/infrastructure/logger";

const PORT = config.get<number>("application.port");

app.listen(PORT, "0.0.0.0", () => {
  log.info(`listening on port ${PORT}`);
});
