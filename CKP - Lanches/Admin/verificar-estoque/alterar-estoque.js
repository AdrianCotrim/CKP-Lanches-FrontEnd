// Modal
var modalAddInsumo = document.getElementById("adicionarInsumo");
var estoque = document.getElementById('estoque')
var modalAltInsumo = document.getElementById('alterarInsumo')

// Exibe modal na tela
estoque.addEventListener('click', (event) => {  
      if(event.target.nodeName == 'TD'){
        modalAltInsumo.style.display = 'flex'

        var insumo = event.target.parentNode
        let celulas = Array.from(insumo.children)

        var nome = celulas[0].textContent;
        var descricao = celulas[2].textContent;
        var qtdMinima = celulas[3].textContent;
        var qtdMaxima = celulas[4].textContent;
        var quantidade = celulas[5].textContent;
        
        document.getElementById('nomeAlterar').value = nome;
        document.getElementById('descricaoAlterar').value = descricao;
        document.getElementById('qtdMinimaAlterar').value = qtdMinima;
        document.getElementById('qtdMaximaAlterar').value = qtdMaxima;
        document.getElementById('quantidadeAlterar').value = quantidade;
    }   
})

modalAltInsumo.addEventListener('click', (event) => {

    // Altera insumo
    if(event.target.textContent == 'Concluir'){
        modalAltInsumo.style.display = 'none'
        const insumo = {
            description: document.getElementById("descricaoAlterar").value,
            lot: parseInt(document.getElementById("loteAlterar").value),
            maxQuantity: parseInt(document.getElementById("qtdMaximaAlterar").value),
            minQuantity: parseInt(document.getElementById("qtdMinimaAlterar").value),
            name: document.getElementById("nomeAlterar").value,    
            quantity: parseInt(document.getElementById("quantidade").value),
        }
        console.log(insumo);

        fetch("http://localhost:8080/insumos", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            method: 'PUT',
            body: insumo
        })
        .then(response => console.log(response))
        .catch(erro => console.log(erro))
    }

    // Fecha o modal
    if(event.target.textContent == 'Cancelar'){
        modalAltInsumo.style.display = 'none'
    }

})