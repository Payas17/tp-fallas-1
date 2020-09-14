import { EngineController, RootController } from "./controllers";
import express from "express";

const app = express();

RootController.get(app);
EngineController.get(app);

export { app };
