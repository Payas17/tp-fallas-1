import Engine from 'json-rules-engine'
import { rules } from "./rules";
import { factsBuilder } from "./facts";

export class RuleEngine {
  constructor() {
    this.engine = new Engine(rules);
  }

  async process(rpm, tflp, mp, ph, pea, vps) {
    let facts = factsBuilder(rpm, tflp, mp, ph, pea, vps);
    const results = await this.engine.run(facts);
    if (results.events.length > 0) return results.events[0].params.message;
    return "Se ingresaron parametros invalidos.";
  }
}
