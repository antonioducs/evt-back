const express = require("express");
const routes = express.Router();
const AcessController = require("./controllers/AcessController");

<<<<<<< HEAD
routes.get("/admin", AdminController.index);
routes.post("/admin", AdminController.store);
routes.get("/admin/:id", AdminController.show);
routes.put("/admin/:id", AdminController.update);
routes.delete("/admin/:id", AdminController.delete);

routes.get("/insc", InscricaoController.index);
//routes.post("/insc", InscricaoController.store);
//routes.get("/insc/:id", InscricaoController.show);
//routes.put("/insc/:id", InscricaoController.update);
//routes.delete("/insc/:id", InscricaoController.delete);
=======
>>>>>>> 58a689593110a2d520ce1988017953f1a1adf197


routes.post("/acess", AcessController.login);
routes.post("/insc", AcessController.getInsc);
routes.get("/insc/:user", AcessController.logout);
routes.post("/cadAdm/", AcessController.cadAdm);
routes.post("/getInsc/", AcessController.inscId);
routes.post("/saveInsc/", AcessController.saveInsc);
routes.post("/deleteInsc/", AcessController.deleteInsc);
routes.post("/creatInsc/", AcessController.creatInsc);

module.exports = routes;