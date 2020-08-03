import Engine from 'json-rules-engine';
import { rules } from "./rules";
import { factsBuilder } from "./facts";

export class RuleEngine {
  constructor() {
    this.rules = rules;
    this.errors = {};
    this.successes = {};
    this.engine = new Engine(Object.values(rules));
    const self = this;

    this.engine.on('success', (event, almanac, ruleResult) => {
      const rule = Object.values(self.rules).filter(rule => rule.name === event.type)[0]
      const result = rule.onSuccess(event, almanac, ruleResult)
      if (result) self.successes[rule.name] = result;
    });

    this.engine.on('failure', (event, almanac, ruleResult) => {
      const rule = Object.values(self.rules).filter(rule => rule.name === event.type)[0]
      const result = rule.onFailure(event, almanac, ruleResult)
      if (result) self.errors[rule.name] = result;
    });
  }

  async process(rpm, tflp, mp, ph, pea, vps) {
    let facts = factsBuilder(rpm, tflp, mp, ph, pea, vps);
    await this.engine.run(facts);
    if (this.errors["paramsDomain"]) return this.errors["paramsDomain"]
    if (this.successes["indeterminate"]) return this.successes["indeterminate"]
    if (this.errors["clean"]) return this.errors["clean"]
    return this.successes["clean"]
  }
}
