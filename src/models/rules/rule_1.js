import { FactsSchema } from "../facts";
import { events } from "../events";

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
    type: events.clean.type,
    params: {
      message: events.clean.message
    }
  }
};
