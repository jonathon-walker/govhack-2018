import { knexConfig } from "./src/infrastructure/db";
export = {
  ...knexConfig,
  debug: false,
  migrations: {
    loadExtensions: [".js"]
  }
};
