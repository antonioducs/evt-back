
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    conected: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Admin", AdminSchema);