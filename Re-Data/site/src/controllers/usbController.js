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
    var idDispositivo = req.body.idDispositivo;
    var motivoBloqueio = req.body.motivo;

    if (motivoBloqueio == undefined) {
        res.status(400).send("Motivo está undefined!");
    } else if (idDispositivo == undefined) {
        res.status(400).send("idDispositivo está undefined!");
    } else {

        usbModel.cadastrar(idDispositivo, motivo)
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}



module.exports = {
    cadastrar
}