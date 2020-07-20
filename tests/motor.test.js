import client from "supertest";
import { app } from "../src";
import { events } from "../src/models/events";
import { FactsSchema } from "../src/models/facts";

describe("motor", () => {
  const ENDPOINT = "/motor";
  it("return that is clean", async () => {
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

  it("return that is not clean if rpm is lower than 120", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 119,
      tflp: FactsSchema.drillingFlowMud.values.LPT,
      mp: FactsSchema.drillingMethod.values.MPR,
      ph: 100,
      pea: 50,
      vps: FactsSchema.stringPowerVariance.values.VPN
    });
    expect(request.body).toEqual(events.dirty.message);
  });
});
