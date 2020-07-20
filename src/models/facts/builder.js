import { FactsSchema } from "./schema";

export const factsBuilder = (rpm, tflp, mp, ph, pea, vps) => ({
  [FactsSchema.drillRPM.name]: rpm,
  [FactsSchema.drillingFlowMud.name]: tflp,
  [FactsSchema.drillingMethod.name]: mp,
  [FactsSchema.hydrostaticPressure.name]: ph,
  [FactsSchema.annularSpacePressure.name]: pea,
  [FactsSchema.stringPowerVariance.name]: vps,
});
