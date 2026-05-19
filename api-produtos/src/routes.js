const { Router } = require("express");
const ProdutoController = require("./controllers/ProdutoController");

const routes = new Router();

routes.post("/produtos", ProdutoController.store);
routes.get("/produtos", ProdutoController.index);
routes.get("/produtos/:id", ProdutoController.show);
routes.put("/produtos/:id", ProdutoController.update);
routes.delete("/produtos/:id", ProdutoController.delete);

module.exports = routes;
