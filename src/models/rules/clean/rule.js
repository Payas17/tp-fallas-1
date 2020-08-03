import { FactsSchema } from "../../facts";
import { events } from "../../events";
import { operators } from "../../operators";
import { conditions } from "./conditions";
import { event } from "./event";
import { ruleNames } from "../internal";
import { priorities } from "../internal";
import { Rule } from "json-rules-engine";

export class Clean extends Rule {
  constructor() {
    super({
      name: ruleNames.clean,
      priority: priorities[ruleNames.clean],
      conditions: conditions,
      event: event
    });
  }

  static notEqualErrorMessage(condition) {
    return `${condition.fact} tiene que ser ${condition.value} pero fue ${condition.factResult}`;
  }

  static notGreaterThanPressuresErrorMessage() {
    const { hydrostaticPressure, annularSpacePressure } = FactsSchema;
    return `${hydrostaticPressure.name} tiene que ser mayor que ${annularSpacePressure.name}`;
  }

  static notGreaterThanErrorMessage(condition) {
    return `${condition.fact} de ${condition.factResult} es muy baja`;
  }

  onSuccess(event, almanac, ruleResult) {
    return this.event.params.message;
  }

  onFailure(event, almanac, ruleResult) {
    const failedConditions = ruleResult.conditions.all.filter(condition => !condition.result);
    const failureDetails = failedConditions.map(condition => {
      switch (condition.operator) {
        case operators.equal:
          return Clean.notEqualErrorMessage(condition);
        case operators.greaterThan:
          if (condition.fact === FactsSchema.hydrostaticPressure.name) {
            return Clean.notGreaterThanPressuresErrorMessage();
          }
          return Clean.notGreaterThanErrorMessage(condition);
      }
    });
    return `${events.dirty.message}. ${failureDetails.join(" y ")}`;
  }
}
