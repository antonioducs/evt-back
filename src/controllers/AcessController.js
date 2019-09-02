const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const InscricaoController = require("../controllers/InscricaoController");
const AdminController = require("../controllers/AdminController");


class AcessController {

  async login(req, res) {

    const admins = await Admin.find();
    var ac = 0;

    if (admins.length) {
      for (var i = 0; i < admins.length; i++) {
        if (admins[i].email === req.body.email && admins[i].senha === req.body.senha) {
          ac = admins[i].id;
          admins[i].conected = true;
          await Admin.findOneAndUpdate(admins[i].id, admins[i]);
          break;
        }
      }
    }

    return res.json({ acess: ac });
  }

  async getInsc(req, res) {

    const user = await Admin.findById(req.body.user);

    if (user.conected) {
      return res = InscricaoController.index(req, res);
    } else {
      return res.json(null);
    }
  }

  async logout(req, res) {
    const admin = await Admin.findById(req.params.user);
    admin.conected = false;
    await Admin.findByIdAndUpdate(admin.id, admin, {
      new: false
    });
  }
}


module.exports = new AcessController();