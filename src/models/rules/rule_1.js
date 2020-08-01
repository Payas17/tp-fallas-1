import { FactsSchema } from "../facts";
import { events } from "../events";

export const rule1 = {
  result: true,
  conditions: {
    all: [
      {
        fact: FactsSchema.drillRPM.name,
        operator: "greaterThan",
        value: 120
      },
      {
        all:[
          {
            fact: FactsSchema.drillingFlowMud.name,
            operator: "equal",
            value: FactsSchema.drillingFlowMud.values.LPT
          },
          {
            fact: FactsSchema.drillingFlowMud.name,
            operator: "in",
            value: Object.values(FactsSchema.drillingFlowMud.values)
          }
        ]
      },
      {
        all:[
          {
            fact: FactsSchema.drillingMethod.name,
            operator: "equal",
            value: FactsSchema.drillingMethod.values.MPR
          },
          {
            fact: FactsSchema.drillingMethod.name,
            operator: "in",
            value: Object.values(FactsSchema.drillingMethod.values)
          }
        ]
      },
      {
        fact: FactsSchema.hydrostaticPressure.name,
        operator: "greaterThan",
        value: { fact: FactsSchema.annularSpacePressure.name }
      },
      {
        all:[
          {
            fact: FactsSchema.stringPowerVariance.name,
            operator: "equal",
            value: FactsSchema.stringPowerVariance.values.VPN
          },
          {
            fact: FactsSchema.stringPowerVariance.name,
            operator: "in",
            value: Object.values(FactsSchema.stringPowerVariance.values)
          }
        ]
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
