import { FactsSchema } from "../../facts";
import { operators } from "../../operators";

export const conditions = {
  all: [
    {
      fact: FactsSchema.drillingFlowMud.name,
      operator: operators.in,
      value: Object.values(FactsSchema.drillingFlowMud.values)
    },
    {
      fact: FactsSchema.drillingMethod.name,
      operator: operators.in,
      value: Object.values(FactsSchema.drillingMethod.values)
    },
    {
      fact: FactsSchema.stringPowerVariance.name,
      operator: operators.in,
      value: Object.values(FactsSchema.stringPowerVariance.values)
    }
  ]
};
