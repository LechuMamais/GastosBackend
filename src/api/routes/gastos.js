const gastosRouter = require("express").Router();
const { getGastos, getGastoById, postGasto, updateGasto, deleteGasto } = require("../controllers/gastos");

gastosRouter.get("/:id", getGastoById);
gastosRouter.get("/", getGastos);
gastosRouter.post("/",  postGasto);
gastosRouter.put("/:id", updateGasto);
gastosRouter.delete("/:id", deleteGasto);

module.exports = gastosRouter;