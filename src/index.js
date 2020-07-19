import express from 'express'
import { RuleEngine } from './rule_engine'
const app = express();

app.get("/", (req, res) =>  res.status(200).json("TP fallas I"));

app.get("/motor", async (req, res) => {
  const ruleEngine = new RuleEngine();
  const { rpm, tflp, mp, ph, pea, vps } = req.query;
  const message = await ruleEngine.process(
    parseInt(rpm),
    tflp.toUpperCase(),
    mp.toUpperCase(),
    parseInt(ph),
    parseInt(pea),
    parseInt(vps),
  );
  return res.status(200).json(message);
});

export { app };
