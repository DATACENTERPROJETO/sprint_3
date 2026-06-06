// função para gerar respostas usando o gemini

var bobModel = require("../models/bobModel")

async function gerarResposta(req, res) {

    const pergunta = req.body.pergunta;

    try {

        const resultado = await bobModel.gerarResposta(pergunta);

        console.log("RESULTADO:", resultado);
        console.log("TIPO:", typeof resultado);

        res.json({
            resultado: resultado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}

module.exports = {
 gerarResposta
};