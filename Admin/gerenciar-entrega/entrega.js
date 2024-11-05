// Obtém o modal
var modal = document.getElementById("confirmarCancel");
var modalAlteraEntrega = document.getElementById("alterarInfoEntrega");

// Obtém o botão que abre o modal
var botaoAbrir = document.getElementById("abrirConfirmarCancel");
var botaoAbrirAlteraEntrega = document.getElementById("abrirAlterarEndereco")
var botaoVoltar = document.getElementById("voltar")

// Obtém o elemento <span> que fecha o modal
var botaoFechar = document.getElementById("cancelar");

// Quando o usuário clicar no botão, abre o modal
botaoAbrir.onclick = function() {
    modal.style.display = "flex";
}

// Quando o usuário clicar no <span> (x), fecha o modal
botaoFechar.onclick = function() {
    modal.style.display = "none";
}

botaoAbrirAlteraEntrega.addEventListener("click", function(){
    modalAlteraEntrega.style.display = "flex";
});

botaoVoltar.addEventListener("click", function(){
    modalAlteraEntrega.style.display = "none";
});