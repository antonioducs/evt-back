const express = require("express");
const routes = express.Router();
const AdminController = require("./controllers/AdminController");
const InscricaoController = require("./controllers/InscricaoController");
const AcessController = require("./controllers/AcessController");

routes.get("/admin", AdminController.index);
routes.post("/admin", AdminController.store);
routes.get("/admin/:id", AdminController.show);
routes.put("/admin/:id", AdminController.update);
routes.delete("/admin/:id", AdminController.delete);

//routes.get("/insc", InscricaoController.index);
//routes.post("/insc", InscricaoController.store);
//routes.get("/insc/:id", InscricaoController.show);
//routes.put("/insc/:id", InscricaoController.update);
//routes.delete("/insc/:id", InscricaoController.delete);


routes.post("/acess", AcessController.login);
routes.post("/insc", AcessController.getInsc);
routes.get("/insc/:user", AcessController.logout);


module.exports = routes;