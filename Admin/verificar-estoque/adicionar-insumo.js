// Modal
var modalAddInsumo = document.getElementById("adicionarInsumo")
var btnAdd = document.getElementById("addInsumo")

// Exibe modal na tela
btnAdd.addEventListener("click", function() {
    modalAddInsumo.style.display = "flex"
})

modalAddInsumo.addEventListener('click', (event) => {

    const form = document.querySelector('#adicionarInsumo form')
    const description = document.getElementById("descricao")
    const maxQuantity = document.getElementById("qtdMaxima")
    const minQuantity = document.getElementById("qtdMinima")
    const quantity = document.getElementById("quantidade")
    const name = document.getElementById("nome")
    
    // Adiciona o insumo ao banco
    if(event.target.textContent == 'Concluir'){

        const insumo = {
            description: description.value,
            maxQuantity: parseInt(maxQuantity.value) > 0 ? parseInt(maxQuantity.value) : 0,
            minQuantity: parseInt(minQuantity.value) > 0 ? parseInt(minQuantity.value) : 0,
            quantity: parseInt(quantity.value) > 0 ? parseInt(quantity.value) : 0,
            name: name.value,
        }
        console.log(insumo)

        if(insumo.minQuantity >= insumo.maxQuantity){
            //Mensagem de erro
            const span = document.createElement('span');
            span.textContent = "Quantidade Mínima ou Máxima inválida!"
            span.style.color = 'red';
            form.appendChild(span);

            //Limpar campos
            maxQuantity.value = null;
            minQuantity.value = null;

            throw new Error("Quantidade Mínima ou Máxima inválida!");
        }

        modalAddInsumo.style.display = 'none';
        
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