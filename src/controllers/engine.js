import { ParamsDomainError, RuleEngine } from "../models";

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
      return res.status(200).json(message);
    } catch (error) {
      if (error instanceof ParamsDomainError) return res.status(400).json(error.message);
      return res.status(500).json(error.message);
    }
  })
};
