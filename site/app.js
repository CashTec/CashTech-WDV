// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

// Isso é uma base de outro projeto, Mudar de acordo com o grupo
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var compontentesRouter = require("./src/routes/componentes");
var enderecoRouter = require("./src/routes/endereco");
var parametrizacaoRouter = require("./src/routes/parametrizacao");
var processosRouter = require("./src/routes/processos")
var listaAtmRouter = require("./src/routes/listaAtm")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));//*
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/componentes", compontentesRouter);
app.use("/endereco", enderecoRouter);
app.use("/parametrizacao", parametrizacaoRouter)
app.use("/processos", processosRouter);
app.use("/listaAtm", listaAtmRouter);


app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});
                