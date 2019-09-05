const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Inscricao = require("../models/Inscricao");
const InscricaoController = require("../controllers/InscricaoController");
const AdminController = require("../controllers/AdminController");
var get_ip = require('ipware')().get_ip;

class AcessController {


  async login(req, res) {

    const admins = await Admin.find();
    var id = 0;

    (admins.length && admins.map(item => {
      if (item.email === req.body.email && item.senha === req.body.senha) {
        id = item._id;
        item.conected = true;
        AdminController.save({ body: item });
      }
    }))

    return res.json({ acess: id });
  }

  async getInsc(req, res) {
    var user = null;
    try {
      user = await Admin.findById(req.body.user, (err, result) => {
        if (err) return null;
      });
    }
    catch (UnhandledPromiseRejectionWarning) { }

    const insc = await Inscricao.find();
    var ret = null;
    if (user !== null && user.conected) {
      ret = insc;
    }
    return res.json(ret);
  }

  async logout(req, res) {
    var user = null;
    try {
      user = await Admin.findById(req.params.user, (err, result) => {
        if (err) return null;
      });
    }
    catch (UnhandledPromiseRejectionWarning) { }

    if (user !== null) {
      user.conected = false;
      AdminController.save({ body: user });
    }
    return res.json({ conected: false });
  }

  async cadAdm(req, res) {
    var ret = -1;

    const admins = await Admin.find();
    var user = null;
    try {
      user = await Admin.findById(req.body.user, (err, result) => {
        if (err) return null;
      });
    }
    catch (UnhandledPromiseRejectionWarning) { }

    if (user !== null && user.conected) {
      ret = 1;
      (admins.length && admins.map(item => {
        if (item.email === req.body.email) {
          ret = 0;
        }
      }))
    }

    if (ret === 1) {
      AdminController.save({
        body: {
          email: req.body.email,
          senha: req.body.senha
        }
      });
    }

    return res.json({ sucess: ret });
  }

  async inscId(req, res) {

    var insc = null;
    var user = null;

    try {
      user = await Admin.findById(req.body.user, (err, result) => {
        if (err) return null;
      });
    }
    catch (UnhandledPromiseRejectionWarning) { }

    if (user !== null && user.conected) {
      try {
        insc = await Inscricao.findById(req.body.insc, (err, result) => {
          if (err) return null;
        });
      }
      catch (UnhandledPromiseRejectionWarning) { }
    }
    return res.json(insc);
  }

  async saveInsc(req, res) {

    var user = null;
    var ret = false;

    try {
      user = await Admin.findById(req.body.user, (err, result) => {
        if (err) return null;
      });
    }
    catch (UnhandledPromiseRejectionWarning) { }

    if (user !== null && user.conected) {
      InscricaoController.up(req);
      ret = true;
    }
    return res.json({ sucess: ret });
  }

  async deleteInsc(req, res) {
    var user = null;
    var ret = false;

    try {
      user = await Admin.findById(req.body.user, (err, result) => {
        if (err) return null;
      });
    }
    catch (UnhandledPromiseRejectionWarning) { }

    if (user !== null && user.conected) {
      InscricaoController.del(req.body.insc);
      ret = true;
    }

    return res.json({ sucess: ret });
  }

  async creatInsc(req, res) {
    const insc = await Inscricao.find();
    var ret = true;
    (insc.length && insc.map(item => {
      if (item.cpf === req.body.cpf)
        ret = false;
    }))

    if (ret) {
      InscricaoController.newInsc(req);
    }
    return res.json({ret});
  }
  async qtdInsc(req, res) {
    const insc = await Inscricao.find();
    var qtd = insc.length;
    return res.json({qtd});
    //return response.data.qtd
  }
}

module.exports = new AcessController();