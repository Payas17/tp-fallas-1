import { conditions } from "./conditions";
import { event } from "./event";
import { priorities } from "../internal";
import { ruleNames } from "../internal";
import { Rule } from "json-rules-engine";

export class ParamsDomain extends Rule {
  constructor() {
    super({
      name: ruleNames.paramsDomain,
      priority: priorities[ruleNames.paramsDomain],
      conditions,
      event
    });
  }

  onSuccess(event, almanac, ruleResult) {
  }

  onFailure(event, almanac, ruleResult) {
    const failedConditions = ruleResult.conditions.all.filter(condition => !condition.result);
    const result = failedConditions.map(condition => {
      return `Parámetros inválidos. ${condition.factResult} es un ${condition.fact} invalido`;
    })
    return result.join(" y ");
  }
}
