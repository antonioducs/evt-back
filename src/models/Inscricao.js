
const mongoose = require("mongoose");

const InscricaoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    student: {
        type: Boolean,
        required: true
    },
    university: {
        type: String,
    },
    register: {
        type: String
    },
    cpf: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    stateInsc: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Inscricao", InscricaoSchema);