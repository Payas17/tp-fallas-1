import { FactsSchema } from "../facts";
import { events } from "../events";

export const rule2 = {
  conditions: {
    any: [
      {
        fact: FactsSchema.drillRPM.name,
        operator: "lessThanInclusive",
        value: 120
      },
      {
        fact: FactsSchema.drillingFlowMud.name,
        operator: "equal",
        value: FactsSchema.drillingFlowMud.values.LPL
      },
      {
        fact: FactsSchema.drillingMethod.name,
        operator: "equal",
        value: FactsSchema.drillingMethod.values.MPD
      },
      {
        fact: FactsSchema.hydrostaticPressure.name,
        operator: "lessThanInclusive",
        value: { fact: FactsSchema.annularSpacePressure.name }
      },
      {
        fact: FactsSchema.stringPowerVariance.name,
        operator: "equal",
        value: FactsSchema.stringPowerVariance.values.VPA
      }
    ]
  },
  event: {
    type: events.dirty.type,
    params: {
      message: events.dirty.message
    }
  }
};
