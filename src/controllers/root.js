import { StatusCodes } from "http-status-codes";

export const RootController = {
  get: app => app.get("/", (req, res) =>
    res.status(StatusCodes.OK).json("TP fallas I")
  )
};
