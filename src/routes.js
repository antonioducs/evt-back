const express = require("express");
const routes = express.Router();
const AcessController = require("./controllers/AcessController");



routes.post("/acess", AcessController.login);
routes.post("/insc", AcessController.getInsc);
routes.get("/insc/:user", AcessController.logout);
routes.post("/cadAdm/", AcessController.cadAdm);
routes.post("/getInsc/", AcessController.inscId);
routes.post("/saveInsc/", AcessController.saveInsc);
routes.post("/deleteInsc/", AcessController.deleteInsc);
routes.post("/creatInsc/", AcessController.creatInsc);


routes.get("/qtdInsc", AcessController.qtdInsc); 
module.exports = routes;