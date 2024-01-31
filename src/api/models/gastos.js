const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gastoSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ["Sin Categoria", "Fijos", "Variables"], default: "Sin Categoria"},
    amount: { type: Number, required: true  },
    description: { type: String},
  },
  {
    collectionName: "gastos",
    timestamps: true,
  }
);

// Creamos y exportamos el modelo Character
const Gasto = mongoose.model('Gasto', gastoSchema);
module.exports = Gasto;