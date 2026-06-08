var database = require("../database/config");

function buscarSensores() {
    return database.executar(`
        SELECT s.idSensor, l.nome AS nomeLugar, s.modeloSensor
        FROM Sensor s
        JOIN Lugar l ON s.fkLugar = l.idLugar
        WHERE s.statusSensor = 'Ativo'
    `);
}

function buscarResumoRacks() {
    return database.executar(`
        SELECT COUNT(DISTINCT s.idSensor) AS total,
            SUM(CASE WHEN t.valor BETWEEN 20 AND 25 AND u.valor BETWEEN 45 AND 55 THEN 1 ELSE 0 END) AS normais,
            SUM(CASE WHEN (t.valor BETWEEN 18 AND 20 OR t.valor BETWEEN 25 AND 27) OR (u.valor BETWEEN 40 AND 45 OR u.valor BETWEEN 55 AND 60) THEN 1 ELSE 0 END) AS atencao,
            SUM(CASE WHEN t.valor < 18 OR t.valor > 27 OR u.valor < 40 OR u.valor > 60 THEN 1 ELSE 0 END) AS criticos
        FROM Sensor s
        JOIN Medicoes t ON t.fkSensor = s.idSensor AND t.unidadeDeMedida = 'Celsius'
        JOIN Medicoes u ON u.fkSensor = s.idSensor AND u.unidadeDeMedida = 'Porcentagem'
        WHERE s.statusSensor = 'Ativo'
    `);
}

function buscarUltimasMedicoes(idSensor) {
    return database.executar(`
        SELECT t.dtMedicao, t.valor AS temperatura, u.valor AS umidade
        FROM Medicoes t
        JOIN Medicoes u ON u.fkSensor = t.fkSensor
            AND DATE_FORMAT(u.dtMedicao, '%Y-%m-%d %H:%i') = DATE_FORMAT(t.dtMedicao, '%Y-%m-%d %H:%i')
            AND u.unidadeDeMedida = 'Porcentagem'
        WHERE t.fkSensor = ${idSensor} AND t.unidadeDeMedida = 'Celsius'
        ORDER BY t.dtMedicao DESC LIMIT 20
    `);
}

function buscarMedicaoTempoReal(idSensor) {
    return database.executar(`
        SELECT t.dtMedicao, t.valor AS temperatura, u.valor AS umidade
        FROM Medicoes t
        JOIN Medicoes u ON u.fkSensor = t.fkSensor
            AND DATE_FORMAT(u.dtMedicao, '%Y-%m-%d %H:%i') = DATE_FORMAT(t.dtMedicao, '%Y-%m-%d %H:%i')
            AND u.unidadeDeMedida = 'Porcentagem'
        WHERE t.fkSensor = ${idSensor} AND t.unidadeDeMedida = 'Celsius'
        ORDER BY t.dtMedicao DESC LIMIT 1
    `);
}

module.exports = { buscarSensores, buscarResumoRacks, buscarUltimasMedicoes, buscarMedicaoTempoReal };