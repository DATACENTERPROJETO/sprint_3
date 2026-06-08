var mysql = require("mysql2");

var mySqlConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

function executar(instrucao, parametros = []) {
    console.log("=== QUERY ===", instrucao);
    console.log("=== PARAMS ===", parametros);
    console.log("=== AMBIENTE ===", process.env.AMBIENTE_PROCESSO);
    // ... resto do código

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, parametros, function (erro, resultados) {  // ✅ passa parâmetros
            conexao.end();
            if (erro) {
                reject(erro);
                return;  // ✅ evita chamar resolve depois do reject
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            reject(erro);  // ✅ estava silenciando o erro antes
        });
    });
}

module.exports = { executar };