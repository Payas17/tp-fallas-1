import { conditions } from "./conditions";
import { event } from "./event";
import { ruleNames } from "../internal";
import { priorities } from "../internal";
import { Rule } from "json-rules-engine";

export class Indeterminate extends Rule {
  constructor() {
    super({
      name: ruleNames.indeterminate,
      priority: priorities[ruleNames.indeterminate],
      conditions,
      event
    });
  }

  onSuccess(event, almanac, ruleResult) {
    return this.event.params.message;
  }

  onFailure(event, almanac, ruleResult) {
    return undefined;
  }
}

