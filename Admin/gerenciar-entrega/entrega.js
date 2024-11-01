// Obtém o modal
var modal = document.getElementById("confirmarCancel");

// Obtém o botão que abre o modal
var botaoAbrir = document.getElementById("abrirConfirmarCancel");

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

