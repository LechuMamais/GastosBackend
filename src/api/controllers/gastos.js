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

const getGastoByName = async (req, res, next) => {
    try {
        const { name } = req.params;
        return res.status(200).json(await Gasto.find({ title: name }));
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const getGastosByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        return res.status(200).json(await Gasto.find({ category: category }));
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const getGastosBiggerThan = async (req, res, next) => {
    try {
        /*Acá lo que vamos a hacer es traer todos los gastos y comparar
          que sean mayores a el valor que llega por params, meterlo en un
          array de resultados y devolverlo en el return*/
        const { biggerThanThis } = req.params;  // el valor llega por params
        const allGastos = await Gasto.find();   // Traemos todos los gastos
        let gastosBiggerThan = []; //Array de resultados
        allGastos.forEach(gasto => {
            if(gasto.amount >= biggerThanThis){
                gastosBiggerThan.push(gasto);
            }
        });
        return res.status(200).json(gastosBiggerThan);
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const getGastosSmallerThan = async (req, res, next) => {
    try {
        /*Esto va a ser lo mismo, pero menor que*/
        const { smallerThanThis } = req.params;
        const allGastos = await Gasto.find();
        let gastosSmallerThan = [];
        allGastos.forEach(gasto => {
            if(gasto.amount <= smallerThanThis){
                gastosSmallerThan.push(gasto);
            }
        });
        return res.status(200).json(gastosSmallerThan);
    } catch (error) {
        return res.status(404).json({ error });
    }
};

const getGastosBetweenDates = async (req, res, next) => {
    try {
        /*Por el req.body nos van a llegar dos valores, fecheInicio y fechaFin. 
          Vamos a filtrar los gastos para devolver aquellos que hayan sido creadas 
          entre esas dos fechas.
          Vamos a tener que convertir las fechas a objetos de fecha de JavaScript
          y despues hacer el .find metiendole los parámetros
          Si no recibe fechaFin, toma el momento en que se hace la peticion
          Además si las dos fechas son iguales, devolvera las de ese dia en particular
          (para eso es el if, que le suma un día a la fechaFin)
          */
        const { fechaInicio, fechaFin } = req.body;
        const fechaInicioDate = new Date(fechaInicio);
        var fechaFinDate = "";
        if(fechaFin){
            fechaFinDate = new Date(fechaFin);
        }else{
            fechaFinDate = new Date();
            console.log(fechaFinDate);
        }
        if (fechaInicioDate.toDateString() === fechaFinDate.toDateString()) {
            fechaFinDate.setDate(fechaFinDate.getDate() + 1); // Sumar un día
        };
        const gastosEntreLasFechas = await Gasto.find({
            createdAt: {
                $gte: fechaInicioDate, // Mayor o igual que la fecha de inicio
                $lte: fechaFinDate,    // Menor o igual que la fecha de fin
            }
        });
        return res.status(200).json(gastosEntreLasFechas);
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error al buscar los gastos.' });
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

module.exports = {getGastos, getGastoById, getGastoByName, getGastosByCategory, getGastosBiggerThan, getGastosSmallerThan, getGastosBetweenDates, postGasto, updateGasto, deleteGasto};