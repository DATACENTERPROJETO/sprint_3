// função para gerar respostas usando o gemini

var bobModel = require("../models/bobModel")

function gerarResposta(req, res) {

    const pergunta = req.body.pergunta;

    try {
        const resultado = bobModel.gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

}

module.exports = {
 gerarResposta
};