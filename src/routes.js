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
<<<<<<< HEAD




=======
routes.post("/qtdInsc", AcessController.qtdInsc); 
>>>>>>> e899afc4f3ef045a2d2cba533198f9e8a0d9ec89
module.exports = routes;