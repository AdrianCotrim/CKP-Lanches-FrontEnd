// Modal
var modalAddInsumo = document.getElementById("adicionarInsumo")
var btnAdd = document.getElementById("addInsumo")

// Exibe modal na tela
btnAdd.addEventListener("click", function() {
    modalAddInsumo.style.display = "flex"
})

modalAddInsumo.addEventListener('click', (event) => {
    
    // Adiciona o insumo ao banco
    if(event.target.textContent == 'Concluir'){
        modalAddInsumo.style.display = 'none'

        const insumo = {
            description: document.getElementById("descricao").value,
            lot: parseInt(document.getElementById("lote").value),
            maxQuantity: parseInt(document.getElementById("qtdMaxima").value),
            minQuantity: parseInt(document.getElementById("qtdMinima").value),
            name: document.getElementById("nome").value,    
            quantity: parseInt(document.getElementById("quantidade").value),
        }
        console.log(insumo)
        
        fetch("http://localhost:8080/insumos", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify(insumo)
        })
        .then(response =>{
            console.log(response)
            window.location.reload()
    })
        .catch(erro => console.log(erro))
    }

    // Fecha o modal
    if(event.target.textContent == 'Cancelar'){
        modalAddInsumo.style.display = 'none'
    }

})