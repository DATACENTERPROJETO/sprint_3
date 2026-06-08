var sensorModel = require("../models/sensoresModel");

function buscarSensores(req, res) {
    sensorModel.buscarSensores()
        .then(resultado => resultado.length > 0 ? res.status(200).json(resultado) : res.status(204).send())
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function buscarResumoRacks(req, res) {
    sensorModel.buscarResumoRacks()
        .then(resultado => resultado.length > 0 ? res.status(200).json(resultado[0]) : res.status(204).send())
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function buscarUltimasMedicoes(req, res) {
    sensorModel.buscarUltimasMedicoes(req.params.idSensor)
        .then(resultado => resultado.length > 0 ? res.status(200).json(resultado) : res.status(204).send())
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function buscarMedicaoTempoReal(req, res) {
    sensorModel.buscarMedicaoTempoReal(req.params.idSensor)
        .then(resultado => resultado.length > 0 ? res.status(200).json(resultado) : res.status(204).send())
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = { buscarSensores, buscarResumoRacks, buscarUltimasMedicoes, buscarMedicaoTempoReal };