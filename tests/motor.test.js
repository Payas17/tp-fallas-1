import client from "supertest";
import { app } from "../src";
import { events } from "../src/models/events";
import { FactsSchema } from "../src/models/facts";

describe("motor", () => {
  const ENDPOINT = "/motor";
  it("returns that is clean", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: FactsSchema.drillingFlowMud.values.LPT,
      mp: FactsSchema.drillingMethod.values.MPR,
      ph: 100,
      pea: 50,
      vps: FactsSchema.stringPowerVariance.values.VPN
    });
    expect(request.body).toEqual(events.clean.message);
  });

  it("returns that is not clean if rpm is lower than 120", async () => {
    const rpm = 119;
    const request = await client(app).get(ENDPOINT).query({
      rpm,
      tflp: FactsSchema.drillingFlowMud.values.LPT,
      mp: FactsSchema.drillingMethod.values.MPR,
      ph: 100,
      pea: 50,
      vps: FactsSchema.stringPowerVariance.values.VPN
    });
    expect(request.body).toEqual("Caso inconcluso");
  });

  it("returns that is not clean if drillingFlowMud is not LPT", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: FactsSchema.drillingFlowMud.values.LPL,
      mp: FactsSchema.drillingMethod.values.MPR,
      ph: 100,
      pea: 50,
      vps: FactsSchema.stringPowerVariance.values.VPN
    });
    expect(
      request.body
    ).toEqual(
      `${events.dirty.message}. drillingFlowMud tiene que ser LPT pero fue LPL`
    );
  });

  it("returns that is not clean if drillingMethod is not MPR", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: FactsSchema.drillingFlowMud.values.LPT,
      mp: FactsSchema.drillingMethod.values.MPD,
      ph: 100,
      pea: 50,
      vps: FactsSchema.stringPowerVariance.values.VPN
    });
    expect(
      request.body
    ).toEqual(
      `${events.dirty.message}. drillingMethod tiene que ser MPR pero fue MPD`
    );
  });

  it("returns dirty if annularSpacePressure is grater than the hydrostaticPressure", async () => {
    const ph = 90;
    const pea = 100;
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: FactsSchema.drillingFlowMud.values.LPT,
      mp: FactsSchema.drillingMethod.values.MPR,
      ph,
      pea,
      vps: FactsSchema.stringPowerVariance.values.VPN
    });
    expect(
      request.body
    ).toEqual(
      `${events.dirty.message}. hydrostaticPressure tiene que ser mayor que annularSpacePressure`
    );
  });

  it("returns that is not clean if stringPowerVariance is not VPN", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: FactsSchema.drillingFlowMud.values.LPT,
      mp: FactsSchema.drillingMethod.values.MPR,
      ph: 100,
      pea: 50,
      vps: FactsSchema.stringPowerVariance.values.VPA
    });
    expect(
      request.body
    ).toEqual(
      `${events.dirty.message}. stringPowerVariance tiene que ser VPN pero fue VPA`
    );
  });

  it("returns that is not clean if all rules fail", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: FactsSchema.drillingFlowMud.values.LPL,
      mp: FactsSchema.drillingMethod.values.MPD,
      ph: 100,
      pea: 500,
      vps: FactsSchema.stringPowerVariance.values.VPA
    });
    let expectedErrors = "drillingFlowMud tiene que ser LPT pero fue LPL";
    expectedErrors += " y drillingMethod tiene que ser MPR pero fue MPD";
    expectedErrors += " y hydrostaticPressure tiene que ser mayor que annularSpacePressure";
    expectedErrors += " y stringPowerVariance tiene que ser VPN pero fue VPA";
    expect(request.body).toEqual(`${events.dirty.message}. ${expectedErrors}`);
  });

  it("returns that is not valid is one parameter is invalid", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: FactsSchema.drillingFlowMud.values.LPT,
      mp: FactsSchema.drillingMethod.values.MPR,
      ph: 100,
      pea: 50,
      vps: "VPE"
    });
    expect(
      request.body
    ).toEqual(
      "Parametros inválidos. VPE es un stringPowerVariance invalido"
    );
  });

});
