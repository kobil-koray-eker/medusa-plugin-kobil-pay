import { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import middlewares from "../../middlewares";
import { getConfigFile, parseCorsOrigins } from "medusa-core-utils";

const route = Router();

export default (app, rootDirectory) => {
  const { configModule }: any = getConfigFile(rootDirectory, `medusa-config`);
  const config = (configModule && configModule.projectConfig ) || {};

  console.log({ config });

  const storeCors = config.store_cors || "";
  route.use(
    cors({
      origin: parseCorsOrigins(storeCors),
      credentials: true,
    })
  );

  app.use("/kobil/payment", route);

  route.post(
    "/callback",
    bodyParser.json(),
    middlewares.wrap(require("./kobil-payment").default)
  );

  return app;
};
