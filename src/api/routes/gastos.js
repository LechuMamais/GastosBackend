const gastosRouter = require("express").Router();
const { getGastos, getGastoById, getGastoByName, getGastosByCategory, getGastosBiggerThan, getGastosSmallerThan, getGastosBetweenDates, postGasto, updateGasto, deleteGasto } = require("../controllers/gastos");


gastosRouter.get("/", getGastos);
gastosRouter.get("/name/:name", getGastoByName);
gastosRouter.get("/category/:category", getGastosByCategory);
gastosRouter.get("/biggerThan/:biggerThanThis", getGastosBiggerThan);
gastosRouter.get("/smallerThan/:smallerThanThis", getGastosSmallerThan);
gastosRouter.get("/gastosbydate", getGastosBetweenDates); // Recibe las fechas por el req.body
gastosRouter.get("/:id", getGastoById);
gastosRouter.post("/",  postGasto);
gastosRouter.put("/:id", updateGasto);
gastosRouter.delete("/:id", deleteGasto);

module.exports = gastosRouter;