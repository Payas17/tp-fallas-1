import client from "supertest";
import { app } from "../index";

describe("motor", () => {
  const ENDPOINT = "/motor";
  it("return that is clean", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 121,
      tflp: "LPT",
      mp: "MPR",
      ph: 100,
      pea: 50,
      vps: "VPN"
    });
    expect(request.body).toEqual("El pozo esta limpio");
  });

  it("return that is not clean if rpm is lower than 120", async () => {
    const request = await client(app).get(ENDPOINT).query({
      rpm: 119,
      tflp: "LPT",
      mp: "MPR",
      ph: 100,
      pea: 50,
      vps: "VPN"
    });
    expect(request.body).toEqual("El pozo está sucio");
  });
});
