var sensorModel = require("../models/sensoresModel");

function buscarSensores(req, res) {
    sensorModel.buscarSensores()
        .then(resultado => res.status(200).json(resultado)) // array vazio [] é válido
        .catch(erro => res.status(500).json({ erro: erro.sqlMessage }));
}

function buscarResumoRacks(req, res) {
    sensorModel.buscarResumoRacks()
        .then(resultado => {
            // garante que nunca retorna nulo
            const dados = resultado[0] || { total: 0, normais: 0, atencao: 0, criticos: 0 };
            res.status(200).json(dados);
        })
        .catch(erro => res.status(500).json({ erro: erro.sqlMessage }));
}

function buscarUltimasMedicoes(req, res) {
    sensorModel.buscarUltimasMedicoes(req.params.idSensor)
        .then(resultado => res.status(200).json(resultado)) // array vazio [] é válido
        .catch(erro => res.status(500).json({ erro: erro.sqlMessage }));
}

function buscarMedicaoTempoReal(req, res) {
    sensorModel.buscarMedicaoTempoReal(req.params.idSensor)
        .then(resultado => res.status(200).json(resultado)) // array vazio [] é válido
        .catch(erro => res.status(500).json({ erro: erro.sqlMessage }));
}

module.exports = { buscarSensores, buscarResumoRacks, buscarUltimasMedicoes, buscarMedicaoTempoReal };