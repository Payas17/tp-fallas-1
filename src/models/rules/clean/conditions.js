import {FactsSchema} from "../../facts";
import {operators} from "../../operators";

export const conditions = {
  all: [
    {
      fact: FactsSchema.drillRPM.name,
      operator: operators.greaterThan,
      value: 120
    },
    {
      fact: FactsSchema.drillingFlowMud.name,
      operator: operators.equal,
      value: FactsSchema.drillingFlowMud.values.LPT
    },
    {
      fact: FactsSchema.drillingMethod.name,
      operator: operators.equal,
      value: FactsSchema.drillingMethod.values.MPR
    },
    {
      fact: FactsSchema.hydrostaticPressure.name,
      operator: operators.greaterThan,
      value: { fact: FactsSchema.annularSpacePressure.name }
    },
    {
      fact: FactsSchema.stringPowerVariance.name,
      operator: operators.equal,
      value: FactsSchema.stringPowerVariance.values.VPN
    }
  ]
};
