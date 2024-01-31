const Gasto = require('../models/gastos');

const getGastos = async (req, res, next) => {
    try {
        return res.status(200).json(await Gasto.find());
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const getGastoById = async (req, res, next) => {
    try {
        return res.status(200).json(await Gasto.findById(req.params.id));
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const postGasto = async (req, res, next) => {
    try {
        return res.status(201).json(await new Gasto(req.body).save());
    } catch (error) {
        return res.status(404).json({ error });
    }
};
const updateGasto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newGasto = await new Gasto(req.body);
        newGasto._id = id;
        const gastoUpdated = await Gasto.findByIdAndUpdate(id, newGasto, { new: true });
        return res.status(200).json(gastoUpdated);
    } catch (error) {
        return res.status(404).json({ error });
    }
};
const deleteGasto = async (req, res, next) => {
    try {
        const gasto = await Gasto.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            mensaje: "Ha sido eliminado con éxito el gasto",
            gastoEliminado: gasto
        });
    } catch (error) {
        return res.status(404).json({ error });
    }
};

module.exports = {getGastos, getGastoById, postGasto, updateGasto, deleteGasto};