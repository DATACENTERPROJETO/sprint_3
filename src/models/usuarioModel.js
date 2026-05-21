var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idUsuario AS id, nome, email
        FROM Usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, telefone, cpf, senha) {
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, telefone, cpf, senha) 
        VALUES ('${nome}', '${email}', '${telefone}', '${cpf}', '${senha}');
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = { autenticar, cadastrar };
