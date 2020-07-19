import Engine from 'json-rules-engine'
import { rules } from "./rules";
 
export class RuleEngine {
  constructor() {
    this.engine = new Engine(rules);
  }

  async process(rpm, tflp, mp, ph, pea, vps) {
    let facts = {
      drillRPM: rpm,
      drillingFlowMud: tflp,
      drillingMethod: mp,
      hydrostaticPressure: ph,
      annularSpacePressure: pea,
      stringPowerVariance: vps,
    };

    const results = await this.engine.run(facts);
    if (results.events.length > 0) return results.events[0].params.message;
    return "Se ingresaron parametros invalidos.";
  }
}
