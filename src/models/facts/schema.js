export const FactsSchema = {
  drillRPM: {
    name: "drillRPM"
  },
  drillingFlowMud: {
    name: "drillingFlowMud",
    values: {
      LPT: "LPT",
      LPL: "LPL"
    }
  },
  drillingMethod: {
    name: "drillingMethod",
    values: {
      MPR: "MPR",
      MPD: "MPD"
    }
  },
  hydrostaticPressure: {
    name: "hydrostaticPressure"
  },
  annularSpacePressure: {
    name: "annularSpacePressure"
  },
  stringPowerVariance: {
    name: "stringPowerVariance",
    values: {
      VPN: "VPN",
      VPA: "VPA"
    }
  }
}
