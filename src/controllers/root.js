export const RootController = {
  get: app => app.get("/", (req, res) =>
    res.status(200).json("TP fallas I")
  )
};
