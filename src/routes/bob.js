var express = require("express");
var router = express.Router();

var bobController = require("../controllers/bobController.js");

// rota para receber perguntas e gerar respostas
router.post("/perguntar", async (req, res) => {
    bobController.gerarResposta(req, res)
});

// router.post("/cadastrar", function (req, res) {
//     empresaController.cadastrar(req, res);
// })

module.exports = router;
