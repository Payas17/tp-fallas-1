import { conditions } from "./conditions";
import { event } from "./event";
import { Rule } from "json-rules-engine";

export class Indeterminate extends Rule {
  constructor() {
    super({
      name: "indeterminate",
      priority: 2,
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

