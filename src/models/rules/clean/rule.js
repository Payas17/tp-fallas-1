import { FactsSchema } from "../../facts";
import { events } from "../../events";
import { operators } from "../../operators";
import { conditions } from "./conditions";
import { event } from "./event";
import { Rule } from "json-rules-engine";

export class Clean extends Rule {
  constructor() {
    super({
      name: "clean",
      priority: 1,
      conditions: conditions,
      event: event
    });
  }

  onSuccess(event, almanac, ruleResult) {
    return this.event.params.message;
  }

  onFailure(event, almanac, ruleResult) {
    const failedConditions = ruleResult.conditions.all.filter(condition => !condition.result);
    const failureDetails = failedConditions.map(condition => {
      switch (condition.operator) {
        case operators.equal:
          return `${condition.fact} tiene que ser ${condition.value} pero fue ${condition.factResult}`;
        case operators.greaterThan:
          if (condition.fact === FactsSchema.hydrostaticPressure.name) {
            return `${FactsSchema.hydrostaticPressure.name} tiene que ser mayor que ${FactsSchema.annularSpacePressure.name}`;
          }
          return `${condition.fact} de ${condition.factResult} es muy baja`;
      }
    });
    almanac.addRuntimeFact("clean", false)
    return `${events.dirty.message}. ${failureDetails.join(" y ")}`;
  }
}
