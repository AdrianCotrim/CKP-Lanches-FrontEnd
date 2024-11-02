var modalAddLote = document.getElementById("addLote");

var btnAbrirAdd = document.getElementById("botaoAddLote");
let btnFecharAdd = document.getElementById("botaoFecharAdd");

btnAbrirAdd.addEventListener("click", function () {
    modalAddLote.style.display = "flex"
});

btnFecharAdd.addEventListener("click", function () {
    modalAddLote.style.display = "none"
})


//formatação monetária

const input = document.getElementById('valor');

input.addEventListener('input', function () {
    // Remove tudo que não é dígito
    let value = this.value.replace(/\D/g, '');

    // Formata o valor como moeda
    if (value) {
        value = (parseInt(value) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        this.value = value;
    } else {
        this.value = '';
    }
});