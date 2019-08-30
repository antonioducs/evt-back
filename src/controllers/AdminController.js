
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

class AdminController {
    async index(req, res) {
      const admins = await Admin.find();
      return res.json(admins);
    }
    async store(req, res) {
      const admin = req.body;
      const savedAdmin = await Admin.create(admin);
      return res.json(savedAdmin);
    }
    async show(req, res) {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      return res.json(admin);
    }
    async update(req, res) {
      const admin = req.body;
      const id = req.params.id;
      const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
        new: true
      });
      return res.json(updatedAdmin);
    }
    async delete(req, res) {
      const id = req.params.id;
      await Admin.findByIdAndDelete(id);
      return res.json({ deleted: true });
    }
  }
  
  module.exports = new AdminController();