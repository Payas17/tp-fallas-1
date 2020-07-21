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
            value: [
              FactsSchema.drillingFlowMud.values.LPT,
              FactsSchema.drillingFlowMud.values.LPL,
            ]
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
            value: [
              FactsSchema.drillingMethod.values.MPR,
              FactsSchema.drillingMethod.values.MPD,
            ]
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
            value: [
              FactsSchema.stringPowerVariance.values.VPN,
              FactsSchema.stringPowerVariance.values.VPA,
            ]
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
