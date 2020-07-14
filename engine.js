import Engine from 'json-rules-engine'
 
export class RuleEngine {

  constructor() {
    this.engine = new Engine()
    this.engine.addRule({
      conditions: {
        all: [{
          fact: 'drillRPM',
          operator: 'greaterThan',
          value: 120
        }, {
          fact: 'drillingFlowMud',
          operator: 'equal',
          value: 'LPT'
        }, {
          fact: 'drillingMethod',
          operator: 'equal',
          value: 'MPR'
        }, {
          fact: 'hidrostaticPressure',
          operator: 'greaterThan',
          value: { fact: 'anularSpacePressure' }
        }, {
          fact: 'stringPowerVariance',
          operator: 'equal',
          value: 'VPN'
        }]
      },
      event: {  
        type: 'clean',
        params: {
          message: 'El pozo esta limpio'
        }
      }
    })
  }

  process(rpm, tflp, mp, ph, pea, vps) {
    let facts = {
      drillRPM: rpm,
      drillingFlowMud: tflp,
      drillingMethod: mp,
      hidrostaticPressure: ph,
      anularSpacePressure: pea,
      stringPowerVariance: vps,
    };

    return this.engine.run(facts)
      .then(results => {
        if (results.events.length > 0) {
          return results.events[0].params.message
        }
        return 'Hay que limpiar el pozo'
      })
  }
}