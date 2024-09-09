var modalAddInsumo = document.getElementById("adicionarInsumo")
var btnAdd = document.getElementById("addInsumo")

btnAdd.addEventListener("click", function() {
    modalAddInsumo.style.display = "flex"
})

modalAddInsumo.addEventListener('click', (event) => {
    if(event.target.textContent == 'Concluir'){
        modalAddInsumo.style.display = 'none'
        const insumo = {
            name: document.getElementById("nome").value,
            description: document.getElementById("descricao").value,
            minQuantity: document.getElementById("qtdMinima").value,
            quantity: document.getElementById("quantidade").value,
            lot: document.getElementById("lote").value
        }
        console.log(insumo)
    }
    if(event.target.textContent == 'Cancelar'){
        modalAddInsumo.style.display = 'none'
    }
})