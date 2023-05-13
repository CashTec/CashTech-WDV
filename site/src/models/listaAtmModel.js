var database = require("../database/config")

function listarAtm(idEmpresa) {
    let query = `SELECT
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                FROM
                    CaixaEletronico ce
                JOIN Endereco e ON
                    e.id = ce.endereco_id
                JOIN Sistema s ON
                    s.id = ce.sistema_id
                JOIN MetricaSistema ms ON
                    s.id = ms.sistema_id
                WHERE
                    ce.empresa_id = ${idEmpresa}
                    and
                    ms.dt_metrica = (
                    SELECT
                        MAX(dt_metrica)
                    FROM
                        MetricaSistema
                    WHERE
                        sistema_id = s.id)
                GROUP BY
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero;
            `
    return database.executar(query);
}

function filtroPesquisa(idEmpresa, tipo, campo) {
    let query = `SELECT
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                FROM
                    CaixaEletronico ce
                JOIN Endereco e ON
                    e.id = ce.endereco_id
                JOIN Sistema s ON
                    s.id = ce.sistema_id
                JOIN MetricaSistema ms ON
                    s.id = ms.sistema_id
                WHERE
                    ce.empresa_id = ${idEmpresa}
                    and
                    ${tipo} like '%${campo}%'
                    and
                    ms.dt_metrica = (
                    SELECT
                        MAX(dt_metrica)
                    FROM
                        MetricaSistema
                    WHERE
                        sistema_id = s.id)
                GROUP BY
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero;
                `
    return database.executar(query);
}


function ordernar(idEmpresa, tipo) {
    let query = `SELECT
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                FROM
                    CaixaEletronico ce
                JOIN Endereco e ON
                    e.id = ce.endereco_id
                JOIN Sistema s ON
                    s.id = ce.sistema_id
                JOIN MetricaSistema ms ON
                    s.id = ms.sistema_id
                WHERE
                    ce.empresa_id = ${idEmpresa}
                    and
                    ms.dt_metrica = (
                    SELECT
                        MAX(dt_metrica)
                    FROM
                        MetricaSistema
                    WHERE
                        sistema_id = s.id)
                GROUP BY
                    ce.id,
                    ce.identificador,
                    ce.situacao,
                    ms.iniciado,
                    ms.tempo_atividade,
                    e.rua,
                    e.numero
                ORDER BY
                    ${tipo};`

    return database.executar(query);
}

function deletar(idEmpresa, idAtm) {
    let query = `DELETE FROM CaixaEletronico WHERE id = ${idAtm} and empresa_id = ${idEmpresa};`
    return database.executar(query);
}


module.exports = {
    listarAtm,
    filtroPesquisa,
    ordernar,
    deletar
}