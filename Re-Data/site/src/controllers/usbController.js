var usbModel = require("../models/usbModel");

// function buscarAquariosPorEmpresa(req, res) {
//     var idUsuario = req.params.idUsuario;

//     aquarioModel.buscarAquariosPorEmpresa(idUsuario).then((resultado) => {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).json([]);
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

function cadastrar(req, res) {
    var idDispositivo = req.body.idDispositivoServer;
    var motivoBloqueio = req.body.motivoBloqueioServer;

    if (idDispositivo == undefined || motivoBloqueio == undefined) {
        res.status(400).send("motivoBloqueio está undefined!");
        res.status(400).send("idDispositivo está undefined!");
    }

    usbModel.cadastrar(idDispositivo, motivoBloqueio).then(function (resposta) {
        res.status(200).send("USB criado com sucesso");
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function buscarUsbs(req, res) {
    var idDispositivo = req.params.idDispositivoServer;
    var deviceId = req.params.deviceIdServer;
    var descricaoUsb = req.params.descricaoUsbServer;

    usbModel.buscarUsbs(idDispositivo, deviceId, descricaoUsb).then((resultado) => {
        if (resultado.length > 0) {
            console.log(resultado)
            res.status(201).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os usb: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUsbsBloqueados(req, res) {
    var idBlockList = req.params.idBlockListServer;
    var motivoBloqueio = req.params.motivoBloqueioServer;
    var deviceId = req.params.deviceIdServer;

    usbModel.buscarUsbsBloqueados(idBlockList, motivoBloqueio, deviceId).then((resultado) => {
        if (resultado.length > 0) {
            console.log(resultado)
            res.status(201).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os usb: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarUsbDescricao(req, res) {
    var idDispositivo = req.params.idDispositivo;
    var novaDescricao = req.body.descricao;

    usbModel.atualizarUsbDescricao(idDispositivo, novaDescricao).then((resultado) => {
        if (resultado.affectedRows > 0) {
            res.status(200).json({ mensagem: "Descrição atualizada com sucesso!" });
        } else {
            res.status(404).json({ mensagem: "Dispositivo não encontrado." });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao atualizar a descrição: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarUsbMotivoBloqueio(req, res) {
    var idBlockList = req.params.idBlockList;
    var novoMotivo = req.body.motivoBloqueio;

    usbModel.atualizarUsbMotivoBloqueio(idBlockList, novoMotivo).then((resultado) => {
        if (resultado.affectedRows > 0) {
            res.status(200).json({ mensagem: "Motivo bloqueio atualizada com sucesso!" });
        } else {
            res.status(404).json({ mensagem: "Registro id blocklist não encontrado." });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao atualizar motivo: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarUsbBloqueado(req, res) {
    var idBlockList = req.params.idBlockList;

    usbModel.deletarUsbBloqueado(idBlockList)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o usb bloqueado: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    buscarUsbs,
    buscarUsbsBloqueados,
    atualizarUsbDescricao,
    atualizarUsbMotivoBloqueio,
    deletarUsbBloqueado
}