export const rule1 = {
  conditions: {
    all: [
      {
        fact: "drillRPM",
        operator: "greaterThan",
        value: 120
      },
      {
        fact: "drillingFlowMud",
        operator: "equal",
        value: "LPT"
      },
      {
        fact: "drillingMethod",
        operator: "equal",
        value: "MPR"
      },
      {
        fact: "hydrostaticPressure",
        operator: "greaterThan",
        value: { fact: "annularSpacePressure" }
      },
      {
        fact: "stringPowerVariance",
        operator: "equal",
        value: "VPN"
      }
    ]
  },
  event: {
    type: "clean",
    params: {
      message: "El pozo esta limpio"
    }
  }
};
