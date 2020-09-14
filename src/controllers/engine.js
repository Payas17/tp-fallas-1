import { ParamsDomainError, RuleEngine } from "../models";
import { StatusCodes } from "http-status-codes";

export const EngineController = {
  get: app => app.get("/engine", async (req, res) => {
    const ruleEngine = new RuleEngine();
    const { rpm, tflp, mp, ph, pea, vps } = req.query;
    try {
      const message = await ruleEngine.process(
        parseInt(rpm),
        tflp.toUpperCase(),
        mp.toUpperCase(),
        parseInt(ph),
        parseInt(pea),
        vps.toUpperCase()
      );
      return res.status(StatusCodes.OK).json(message);
    } catch (error) {
      if (error instanceof ParamsDomainError)
        return res.status(StatusCodes.BAD_REQUEST).json(error.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  })
};
