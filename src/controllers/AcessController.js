const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Inscricao = require("../models/Inscricao");
const InscricaoController = require("../controllers/InscricaoController");
const AdminController = require("../controllers/AdminController");

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eventocaduemspba@gmail.com",
    pass: "uemspbacad2019"
  },
});

const mailOptions = {
  from: 'eventocaduemspba@gmail.com',
  to: 'antonioduarte@alunos.utfpr.edu.br',
  subject: 'Inscrição Evento de Estudos Jurídicos e Sociais',
  text:
    'Sua inscrição foi realizada com sucesso!\n\n' +
    'Para efetivá-la, é necessário realizar o pagamento. Entre em contato conosco por algum de nossos portais de comunicação.\n\n' +
    'Atenciosamente,\n' +
    'Centro Acadêmico de Direto Desembargador Leão Neto do Carmo\n' +
    'email: cadesembargador@gmail.com<\n' +
    'tel: +55 67 98117-7918 | +55 67 9823-7255\n' +
    'Insta: @caduemspba\n' +
    'Avenida João Rodrigues de Melo – Jardim Santa Mônica - Paranaíba - MS'
};

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
      const insc = await Inscricao.find();
      var qtd = 0;
      (insc.length && insc.map(item => {
        if (item.stateInsc === true)
          qtd += 1;
      }))

      if (qtd >= 200)
        ret = false;
    }

    if (ret) {
      InscricaoController.newInsc(req);
      mailOptions.to = req.body.email;
      transporter.sendMail(mailOptions, function (error, info) { });
    }
    return res.json({ ret });
  }
  async qtdInsc(req, res) {
    const insc = await Inscricao.find();
    var qtd = 0;
    (insc.length && insc.map(item => {
      if (item.stateInsc === true)
        qtd += 1;
    }))

    return res.json({ qtd });
  }
}

module.exports = new AcessController();