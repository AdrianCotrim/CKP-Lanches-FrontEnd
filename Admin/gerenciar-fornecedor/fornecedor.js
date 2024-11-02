// Obtém o modal
let modalCadastro = document.getElementById("cadastrarFornecedor");
let modalAltera = document.getElementById("alterarFornecedor");
let info = document.getElementById("infoFornecedor");

// Obtém o botão que abre o modal
let botaoAbrirCadastro = document.getElementById("abrirCadastrarFornecedor");
let botaoAbrirAltera = document.getElementById("abrirAlterarFornecedor");

// Obtém o elemento que fecha o modal
let botaoFecharCadastro = document.getElementById("cancelarCadastro");
let botaoFecharAltera = document.getElementById("cancelarAlteracao");

// Quando o usuário clicar no botão, abre o modal
botaoAbrirCadastro.onclick = function () {
    modalCadastro.style.display = "flex";
    modalAltera.style.display = "none"
    info.style.display = "none";
}

botaoAbrirAltera.onclick = function () {
    modalAltera.style.display = "flex";
    modalCadastro.style.display = "none";
}

// Quando o usuário clicar no <span> (x), fecha o modal
botaoFecharCadastro.onclick = function () {
    modalCadastro.style.display = "none";
    info.style.display = "flex";
}

botaoFecharAltera.onclick = function () {
    modalAltera.style.display = "none";
}