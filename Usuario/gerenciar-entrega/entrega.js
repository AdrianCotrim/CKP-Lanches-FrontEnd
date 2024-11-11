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

//Inputs

const endereco_alterar = document.getElementById('enderecoAlterar');
const motoboy_alterar = document.getElementById('motoboyAlterar');
const troco_alterar = document.getElementById('trocoAlterar');
const complemento_alterar = document.getElementById('complementoAlterar');
const taxa_alterar = document.getElementById('taxaAlterar');
const id_entrega_alterar = document.getElementById('id-entrega-alterar');

botaoAbrirAlteraEntrega.addEventListener("click", function(){
    msgErroAlterarEntrega.style.display = 'none';
    endereco_alterar.value = endereco.textContent;
    motoboy_alterar.value = motoboy.textContent;
    troco_alterar.value = 'SIM';
    complemento_alterar.value = complemento.textContent;
    taxa_alterar.value = valorTaxa.textContent;
    id_entrega_alterar.value = id_entrega.value;
    modalAlteraEntrega.style.display = "flex";
});

botaoVoltar.addEventListener("click", function(){
    modalAlteraEntrega.style.display = "none";
});