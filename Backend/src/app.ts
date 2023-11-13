import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import taskController from "./6-controllers/task-controller";
import customersController from "./6-controllers/customers-controller";
import employeesController from "./6-controllers/employees-controller";

const server = express();

server.use(cors());
server.use(express.json())
server.use("/api", taskController);
server.use("/api", customersController);
server.use("/api", employeesController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

