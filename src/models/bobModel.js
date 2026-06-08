
const { GoogleGenAI } = require("@google/genai");
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

async function gerarResposta(pergunta) {
    
    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Você é uma i.a de assistência da empresa EasyServerMonitoramento, e nos ajuda a resolver problemas tecnicos, se apresente amigavelmente e diga quem é a easy server em mensagens de oi.fir
            Responda apenas perguntas que envolva assuntos sobre servidores, arduinos e programação, em um paragráfo responda: ${pergunta}`

        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }    

}

module.exports = {
 gerarResposta
};
