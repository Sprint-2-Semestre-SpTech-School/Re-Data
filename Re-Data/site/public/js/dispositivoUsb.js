// Modal para sair
function sair() {
    const modalSairDentro = document.getElementById('modalSair')
    modalSairDentro.classList.add('abrir')

    modalSairDentro.addEventListener('click', (e) => {
        if (e.target.id == 'fecharModal' || e.target.id == 'modalSair') {
            modalSairDentro.classList.remove('abrir')
        }
    })
}

function sairConta() {
    setTimeout(() => {
        window.location = "login.html";
    }, "1000");
}

// Formulario
document.addEventListener('DOMContentLoaded', function () {
    // Esconde o formulário quando a página carregar
    document.getElementById('formularioAdicionar').classList.add('hidden');

    // Exibe o formulário quando o botão "Novo" for clicado
    // document.querySelector('.buttonTools').addEventListener('click', function () {
    //     document.getElementById('formularioAdicionar').classList.remove('hidden');
    // });

    // // Esconde o formulário quando o botão "Salvar" for clicado
    // document.getElementById('saveButton').addEventListener('click', function (event) {
    //     event.preventDefault(); // Impede o envio do formulário para demonstração
    //     document.getElementById('formularioAdicionar').classList.add('hidden');
    // });

    // Exibe o formulário quando o botão de editar for clicado
    document.querySelectorAll('edit_usb').forEach(function (button) {
        button.addEventListener('click', function () {
            document.getElementById('formularioEditar').classList.remove('hidden');
            // Aqui você pode adicionar o código para preencher o formulário com os dados do usuário a ser editado
        });
    });

    // Esconde o formulário quando o botão "Salvar" for clicado
    // document.getElementById('saveButton').addEventListener('click', function (event) {
    //     event.preventDefault(); // Impede o envio do formulário para demonstração
    //     document.getElementById('formularioEditar').classList.add('hidden');
    // });
});

document.addEventListener('DOMContentLoaded', function () {

    var formularioEditar = document.getElementById('formularioEditar');
    formularioEditar.addEventListener('submit', function (event) {
        event.preventDefault();
        var idDispositivo = document.getElementById('id_usb_list').value;
        var novaDescricao = document.getElementById('descricao_usb').value;
        atualizarUsbDescricao(idDispositivo, novaDescricao);
    });
});

var idMaquina = sessionStorage.ID_MAQUINA;
var info_usb = null;

function listarUsbs() {
    console.log('Entrei na função listar usbs');
    console.log(idMaquina);

    fetch(`/usb/listarUsbs/${idMaquina}`, {
        method: "GET",
    })
        .then(function (response) {
            console.log('entrei na then listar usbs');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })

        .then(function (lista_usbs) {
            console.log(lista_usbs);

            // console.log(lista_projetos[0].qtsMaquinas);

            // var qtdMaquinas = lista_projetos[0].qtsMaquinas
            // console.log(qtdMaquinas);

            var usb_list = document.getElementById("tabelaUsbConectado");

            var tbody = usb_list.querySelector("tbody");
            tbody.innerHTML = "";

            if (!lista_usbs || lista_usbs.length === 0) {
                console.error('Nenhum dado de usb encontrado.');
                return;
            }
            info_usb = lista_usbs
            lista_usbs.forEach(function (usb) {
                var existingRow = document.querySelector(`.id_dispositivo[data-id="${usb.idDispositivo}"]`);
                if (existingRow) {
                    existingRow.closest('tr').innerHTML = `
                    <td><i class="id_dispositivo" data-id="${usb.idDispositivo}">${usb.idDispositivo}</i></td>
                    <td><i class="device_id">${usb.idDevice}</i></td>
                    <td><i class="descricao_usb">${usb.descricao}</i></td>
                    <td>
                        <button class="edit">Editar</button>
                    </td>
                `;
                } else {
                    var row = tbody.insertRow();
                    row.innerHTML = `
                    <td><i class="id_dispositivo" data-id="${usb.idDispositivo}">${usb.idDispositivo}</i></td>
                    <td><i class="device_id">${usb.idDevice}</i></td>
                    <td><i class="descricao_usb">${usb.descricao}</i></td>
                    <td>
                        <button class="edit_usb">Editar</button>
                    </td>
                `;
                }
            });
            tbody.querySelectorAll('.edit_usb').forEach(function (button) {
                button.addEventListener('click', function () {
                    var row = button.closest('tr');
                    var idDispositivo = row.querySelector('.id_dispositivo').dataset.id;
                    var descricao = row.querySelector('.descricao_usb').textContent;

                    document.getElementById('formularioEditar').classList.remove('hidden');
                    document.getElementById('id_usb_list').value = idDispositivo;
                    document.getElementById('descricao_usb').value = descricao;
                });
            });
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}

function listarUsbsBloqueados() {
    console.log('Entrei na função listar usbs bloqueados');
    console.log(idMaquina);

    fetch(`/usb/listarUsbsBloqueados/${idMaquina}`, {
        method: "GET",
    })
        .then(function (response) {
            console.log('entrei na then listar usbs bloqueados');
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })

        .then(function (lista_usbs_bloqueados) {
            console.log(lista_usbs_bloqueados);

            // console.log(lista_projetos[0].qtsMaquinas);

            // var qtdMaquinas = lista_projetos[0].qtsMaquinas
            // console.log(qtdMaquinas);

            var usb_list_bloqueados = document.getElementById("tabelaUsbBloqueado");

            var tbody = usb_list_bloqueados.querySelector("tbody");
            tbody.innerHTML = "";

            if (!lista_usbs_bloqueados || lista_usbs_bloqueados.length === 0) {
                console.error('Nenhum dado de usb encontrado.');
                return;
            }
            info_usb_bloqueado = lista_usbs_bloqueados;
            lista_usbs_bloqueados.forEach(function (usb) {
                var row = usb_list_bloqueados.insertRow();
                row.innerHTML = `
                <td><i class="id_blacklist"></i>${usb.idBlackList}</td>
                <td><i class="motivo_bloqueio_blacklist"></i>${usb.motivoBloqueio}</td>
                <td><i class="id_dispositivo_blacklist"></i>${usb.fkDeviceId}</td>
                <td>
                    <button class="edit_blacklist">Editar</button>
                    <button class="delete">Excluir</button>
                </td>
                `;

                var editButton = row.querySelector('.edit');
                var delButton = row.querySelector('.delete');
                editButton.addEventListener('click', function () {
                    document.getElementById('formularioEditar').classList.remove('hidden');

                    // Abre o formulário para editar
                });
                delButton.addEventListener('click', function () {
                    document.getElementById('formularioEditar').classList.remove('hidden');

                    // Abre o formulário para deletar
                });
            });
            // var boxUsb = document.querySelectorAll(".usb_list");
            // // var boxQtd = document.querySelectorAll(".nameDemand");
            // for (var i = 0; i < boxUsb.length; i++) {
            //     boxUsb[i].addEventListener('click', acessarProjeto);
            //     // boxQtd[i].addEventListener('click', selectProjeto)
            // }
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}

function atualizarUsbDescricao(idDispositivo, novaDescricao) {
    fetch(`/usb/atualizarUsbDescricao/${idDispositivo}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ descricao: novaDescricao })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Erro ao atualizar a descrição');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Descrição atualizada com sucesso:', data);
            document.getElementById('formularioEditar').classList.add('hidden');
            listarUsbs(); // Atualize a lista para refletir as mudanças
        })
        .catch(function (error) {
            console.error(`#ERRO: ${error}`);
        });
}