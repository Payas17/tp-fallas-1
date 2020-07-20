import { FactsSchema } from "../facts";

export const rule1 = {
  conditions: {
    all: [
      {
        fact: FactsSchema.drillRPM.name,
        operator: "greaterThan",
        value: 120
      },
      {
        fact: FactsSchema.drillingFlowMud.name,
        operator: "equal",
        value: FactsSchema.drillingFlowMud.values.LPT
      },
      {
        fact: FactsSchema.drillingMethod.name,
        operator: "equal",
        value: FactsSchema.drillingMethod.values.MPR
      },
      {
        fact: FactsSchema.hydrostaticPressure.name,
        operator: "greaterThan",
        value: { fact: FactsSchema.annularSpacePressure.name }
      },
      {
        fact: FactsSchema.stringPowerVariance.name,
        operator: "equal",
        value: FactsSchema.stringPowerVariance.values.VPN
      }
    ]
  },
  event: {
    type: "clean",
    params: {
      message: "El pozo esta limpio"
    }
  }
};
