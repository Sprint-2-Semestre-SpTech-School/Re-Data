// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var indexRouter = require("./src/routes/index");

var cadastroRouter = require("./src/routes/cadastro");
var loginRouter = require("./src/routes/login");
var dashboardRouter = require("./src/routes/dashboard");
var projetosRouter = require("./src/routes/projetos");
var dashProjetoRouter = require("./src/routes/dashProjeto");
var kpisRouter = require("./src/routes/kpis");
var maquinaRouter = require("./src/routes/maquina");
var kpiMaquinaRouter = require("./src/routes/kpiMaquina");
var usbRouter = require("./src/routes/usb");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/cadastro", cadastroRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/projetos", projetosRouter);

app.use("/usb", usbRouter);

app.use("/dashProjeto", dashProjetoRouter);
app.use("/kpis", kpisRouter);
app.use("/maquina", maquinaRouter);
app.use("/kpiMaquina", kpiMaquinaRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
