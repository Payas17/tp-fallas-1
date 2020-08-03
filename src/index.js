import express from "express"
import { EngineController, RootController } from "./controllers";
const app = express();

RootController.get(app);
EngineController.get(app);

export { app };
