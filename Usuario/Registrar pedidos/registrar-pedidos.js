// script.js

// Obtém o modal
var modal = document.getElementById("janelaRegisPedido");

// Obtém o botão que abre o modal
var btn = document.getElementById("registrarPedido");

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


document.getElementById('lanches').addEventListener('change', function() {
    const selectedItem = this.value;
    if (selectedItem) {
        addItemToList(selectedItem);
        this.value = ''; // Limpa a seleção
    }
});

document.getElementById('bebidas').addEventListener('change', function() {
    const selectedItem = this.value;
    if (selectedItem) {
        addItemToList(selectedItem);
        this.value = ''; // Limpa a seleção
    }
});

function addItemToList(item) {
    const itemList = document.getElementById('itemList');
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.textContent = item;
    itemList.appendChild(itemElement);
}