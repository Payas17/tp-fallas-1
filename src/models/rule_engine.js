import Engine from 'json-rules-engine';
import { events } from './events';
import { rules } from "./rules";
import { factsBuilder, FactsSchema } from "./facts";

export class RuleEngine {
  resultMessage = '';
  constructor() {
    this.engine = new Engine(rules);
    const self = this;

    this.engine.on('success', (event, almanac, ruleResult) => {
      self.resultMessage = event.params.message;
    });

    this.engine.on('failure', (event, almanac, ruleResult) => {
      let detail = this.filterAllConditions(ruleResult.conditions);
      if (detail.includes('invalido')) {
        self.resultMessage = `Parametros inválidos. ${detail}`;
      } else {
        self.resultMessage = `${events.dirty.message}. ${detail}`;
      }
    });
  }

  filterAllConditions(conditions) {
    const detail = conditions.all.filter(condition => !condition.result)
      .map(condition => {
        switch (condition.operator) {
          case 'equal':
            return `${condition.fact} tiene que ser ${condition.value} pero fue ${condition.factResult}`;
          case 'greaterThan':
            if (condition.fact === FactsSchema.hydrostaticPressure.name) {
              return `${FactsSchema.hydrostaticPressure.name} tiene que ser mayor que ${FactsSchema.annularSpacePressure.name}`;
            }
            return `${condition.fact} de ${condition.factResult} es muy baja`;
          case 'in':
            return `${condition.factResult} es un ${condition.fact} invalido`;
          case 'all':
            return this.filterAllConditions(condition);
        }
      }).join(' y ');
  
    return detail;
  }

  async process(rpm, tflp, mp, ph, pea, vps) {
    let facts = factsBuilder(rpm, tflp, mp, ph, pea, vps);
    const results = await this.engine.run(facts);
    return this.resultMessage;
  }
}
