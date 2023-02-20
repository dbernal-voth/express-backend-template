import express from "express";
/* import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("./swagger.json"); */

import cors from "cors";
import helmet from "helmet";
import config from "config";
import { setCache } from "middlewares/cache";
import { errorHandler, logErrors } from "middlewares/errors";
import notFoundHandler from "middlewares/notFound";
import tokenValidation from "middlewares/tokenValidation";
import importRoutes from "./modules";

export default function createServer(): express.Application {
  const corsOptions: cors.CorsOptions = {
    origin: config.dev ? "*" : "*",
    methods: "GET,PUT,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "10mb" }));
  app.use(cors(corsOptions));
  app.use(tokenValidation);

  const router = express.Router();
  app.use("/api", router);

  app.use(setCache);

  importRoutes(router);

  app.use(notFoundHandler);
  app.use(logErrors);
  app.use(errorHandler);

  process.on("exit", () => console.log("Aplicación terminada"));
  process.on("uncaughtException", (e) => console.error(e));

  return app;
}
