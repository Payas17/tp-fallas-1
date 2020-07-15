import Engine from 'json-rules-engine'
import { rule1 } from "./rules";
 
export class RuleEngine {
  constructor() {
    this.engine = new Engine([rule1]);
  }

  async process(rpm, tflp, mp, ph, pea, vps) {
    let facts = {
      drillRPM: rpm,
      drillingFlowMud: tflp,
      drillingMethod: mp,
      hidrostaticPressure: ph,
      anularSpacePressure: pea,
      stringPowerVariance: vps,
    };

    const results = await this.engine.run(facts);
    if (results.events.length > 0) return results.events[0].params.message;
    return "El pozo está sucio";
  }
}