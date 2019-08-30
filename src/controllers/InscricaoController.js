

const mongoose = require("mongoose");
const Inscricao = require("../models/Inscricao");

class InscricaoController {
    async index(req, res) {
      const inscricoes = await Inscricao.find();
      return res.json(inscricoes);
    }
    async store(req, res) {
      const inscricao = req.body;
      const savedInscricao = await Inscricao.create(inscricao);
      return res.json(savedInscricao);
    }
    async show(req, res) {
      const id = req.params.id;
      const inscricao = await Inscricao.findById(id);
      return res.json(inscricao);
    }
    async update(req, res) {
      const inscricao = req.body;
      const id = req.params.id;
      const updatedInscricao = await Inscricao.findByIdAndUpdate(id, inscricao, {
        new: true
      });
      return res.json(updatedInscricao);
    }
    async delete(req, res) {
      const id = req.params.id;
      await Inscricao.findByIdAndDelete(id);
      return res.json({ deleted: true });
    }
  }
  
  module.exports = new InscricaoController();