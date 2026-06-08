// sensoresModel.js

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
        SELECT
            COUNT(DISTINCT s.idSensor) AS total,

            SUM(CASE WHEN t.valor BETWEEN 20 AND 25
                      AND u.valor BETWEEN 45 AND 55 THEN 1 ELSE 0 END) AS normais,

            SUM(CASE WHEN (t.valor BETWEEN 18 AND 20 OR t.valor BETWEEN 25 AND 27)
                      OR (u.valor BETWEEN 40 AND 45 OR u.valor BETWEEN 55 AND 60) THEN 1 ELSE 0 END) AS atencao,

            SUM(CASE WHEN t.valor < 18 OR t.valor > 27
                      OR u.valor < 40 OR u.valor > 60 THEN 1 ELSE 0 END) AS criticos

        FROM Sensor s

        -- pega a última temperatura de cada sensor
        JOIN Medicoes t ON t.idMedicao = (
            SELECT idMedicao FROM Medicoes
            WHERE fkSensor = s.idSensor AND unidadeDeMedida = '°C'
            ORDER BY dtMedicao DESC LIMIT 1
        )

        -- pega a última umidade de cada sensor
        JOIN Medicoes u ON u.idMedicao = (
            SELECT idMedicao FROM Medicoes
            WHERE fkSensor = s.idSensor AND unidadeDeMedida = '%'
            ORDER BY dtMedicao DESC LIMIT 1
        )

        WHERE s.statusSensor = 'Ativo'
    `);
}

function buscarUltimasMedicoes(idSensor) {
    return database.executar(`
        SELECT
            t.dtMedicao,
            t.valor AS temperatura,
            u.valor AS umidade
        FROM Medicoes t
        -- junta com a umidade mais próxima no tempo (dentro de 1 minuto)
        JOIN Medicoes u
            ON u.fkSensor = t.fkSensor
            AND u.unidadeDeMedida = '%'
            AND ABS(TIMESTAMPDIFF(SECOND, u.dtMedicao, t.dtMedicao)) <= 60
        WHERE t.fkSensor = ?
          AND t.unidadeDeMedida = '°C'
        ORDER BY t.dtMedicao DESC
        LIMIT 20
    `, [idSensor]);
}

function buscarMedicaoTempoReal(idSensor) {
    return database.executar(`
        SELECT
            t.dtMedicao,
            t.valor AS temperatura,
            u.valor AS umidade
        FROM Medicoes t
        JOIN Medicoes u
            ON u.fkSensor = t.fkSensor
            AND u.unidadeDeMedida = '%'
            AND ABS(TIMESTAMPDIFF(SECOND, u.dtMedicao, t.dtMedicao)) <= 60
        WHERE t.fkSensor = ?
          AND t.unidadeDeMedida = '°C'
        ORDER BY t.dtMedicao DESC
        LIMIT 1
    `, [idSensor]);
}

module.exports = { buscarSensores, buscarResumoRacks, buscarUltimasMedicoes, buscarMedicaoTempoReal };