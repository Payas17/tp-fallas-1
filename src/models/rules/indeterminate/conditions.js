import { FactsSchema } from "../../facts";
import { operators } from "../../operators";

export const conditions = {
  all: [
    {
      fact: FactsSchema.drillRPM.name,
      operator: operators.lessThan,
      value: 120
    },
    {
      fact: FactsSchema.stringPowerVariance.name,
      operator: operators.equal,
      value: FactsSchema.stringPowerVariance.values.VPN
    }
  ]
};
