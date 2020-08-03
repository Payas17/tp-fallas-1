import { conditions } from "./conditions";
import { event } from "./event";
import { Rule } from "json-rules-engine";

export class ParamsDomain extends Rule {
  constructor() {
    super({
      name: "paramsDomain",
      priority: 3,
      conditions,
      event
    });
  }

  onSuccess(event, almanac, ruleResult) {
  }

  onFailure(event, almanac, ruleResult) {
    const failedConditions = ruleResult.conditions.all.filter(condition => !condition.result);
    const result = failedConditions.map(condition => {
      return `Parametros inválidos. ${condition.factResult} es un ${condition.fact} invalido`;
    })
    return result.join(" y ");
  }
}
