var database = require("../database/config")

function getDadosDash(idProjeto) {
    console.log("Chegou no model para buscar os dados da Dashboard", idProjeto);

    var instrucao = `
    SELECT idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina, AVG(valorRegistro) AS mediaDados
    FROM Registro 
    JOIN InfoHardware ON fkHardware = idHardware
    JOIN Maquina ON fkMaquina = idMaquina
    JOIN Projeto ON fkProjeto = idProjeto
    WHERE idProjeto = ${idProjeto} 
    GROUP BY idRegistro, nomeRegistro, tempoCapturas, idProjeto, idMaquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarMaquina(destino, descricao, idProjeto, idEmpresa) {
    console.log("Chegou no model para buscar os dados da Dashboard", destino, descricao, idProjeto, idEmpresa);

    var instrucao = `
        insert into Maquina (destino, descricao, fkProjeto, fkEmpresa) VALUES ('${destino}', '${descricao}', ${idProjeto}, ${idEmpresa});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscaridMaquina(idProjeto) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscaridMaquina(): ", idMaquina)

    var instrucao = `
        select idMaquina from Maquina where fkProjeto = ${idProjeto};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMaquinasPorProjeto(idProjeto) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarProjetosPorEmpresa(): ", idProjeto)

    var instrucao = `
        select * from Maquina where fkProjeto = ${idProjeto};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrarDashMaquina(idMaquina) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrarDashMaquina(): ", idMaquina)

    var instrucao = `
        select idMaquina from Maquina;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    getDadosDash,
    adicionarMaquina,
    buscaridMaquina,
    buscarMaquinasPorProjeto,
    entrarDashMaquina,
}