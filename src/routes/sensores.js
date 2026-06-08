var express = require("express");
var router = express.Router();
var sensorController = require("../controllers/sensoresController");

router.get("/", (req, res) => sensorController.buscarSensores(req, res));
router.get("/resumo", (req, res) => sensorController.buscarResumoRacks(req, res));
router.get("/medicoes/ultimas/:idSensor", (req, res) => sensorController.buscarUltimasMedicoes(req, res));
router.get("/medicoes/tempo-real/:idSensor", (req, res) => sensorController.buscarMedicaoTempoReal(req, res));

module.exports = router;