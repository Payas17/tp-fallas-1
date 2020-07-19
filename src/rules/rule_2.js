export const rule2 = {
  conditions: {
    any: [
      {
        fact: "drillRPM",
        operator: "lessThanInclusive",
        value: 120
      },
      {
        fact: "drillingFlowMud",
        operator: "equal",
        value: "LPL"
      },
      {
        fact: "drillingMethod",
        operator: "equal",
        value: "MPD"
      },
      {
        fact: "hydrostaticPressure",
        operator: "lessThanInclusive",
        value: { fact: "annularSpacePressure" }
      },
      {
        fact: "stringPowerVariance",
        operator: "notEqual",
        value: 0
      }
    ]
  },
  event: {
    type: "dirty",
    params: {
      message: "El pozo esta sucio"
    }
  }
};