export const factsBuilder = (rpm, tflp, mp, ph, pea, vps) => ({
  drillRPM: rpm,
  drillingFlowMud: tflp,
  drillingMethod: mp,
  hydrostaticPressure: ph,
  annularSpacePressure: pea,
  stringPowerVariance: vps,
});
