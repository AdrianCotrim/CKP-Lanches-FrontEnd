var modalAddLote = document.getElementById("addLote");
var btnAbrirAdd = document.getElementById("botaoAddLote");
let btnFecharAdd = document.getElementById("botaoFecharAdd");

btnAbrirAdd.addEventListener("click", function () {
    modalAddLote.style.display = "flex"
    
    // Select insumos
    fetch("http://localhost:8080/insumos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {
        const insumos = document.getElementById("insumos");
        dados.forEach(insumo => {
            let insumoOption = document.createElement("option");
            insumoOption.textContent = insumo.name;
            insumos.appendChild(insumoOption);
            
        })
    })
    .catch(erro => console.log(erro))
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