// script.js

// Obtém o modal
var modal = document.getElementById("janelaAddProduto");

// Obtém o botão que abre o modal
var btn = document.getElementById("addProduto");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementsByClassName("botao-cancelar")[0];

// Quando o usuário clicar no botão, abre o modal
btn.onclick = function() {
    modal.style.display = "flex";
}

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}