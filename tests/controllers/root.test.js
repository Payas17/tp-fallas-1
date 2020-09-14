import client from "supertest";
import { app } from "../../src";
import { StatusCodes } from "http-status-codes";

describe("root", () => {
  const ENDPOINT = "/";
  it("returns a welcome message", async () => {
    const request = await client(app).get(ENDPOINT);
    expect(request.body).toEqual("TP fallas I");
    expect(request.status).toEqual(StatusCodes.OK);
  });

  it("returns an OK status code", async () => {
    const request = await client(app).get(ENDPOINT);
    expect(request.status).toEqual(StatusCodes.OK);
  });
});
