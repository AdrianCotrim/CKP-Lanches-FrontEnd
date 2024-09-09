var modalAddInsumo = document.getElementById("adicionarInsumo");
var estoque = document.getElementById('estoque')
var modalAltInsumo = document.getElementById('alterarInsumo')

estoque.addEventListener('click', (event) => {
      if(event.target.nodeName == 'TD'){
        modalAltInsumo.style.display = 'flex'

        var insumo = event.target.parentNode
        let celulas = Array.from(insumo.children)

        var nome = celulas[0].textContent;
        var descricao = celulas[2].textContent;
        var qtdMinima = celulas[3].textContent;
        var quantidade = celulas[4].textContent;
            
        document.getElementById('nomeAlterar').value = nome;
        document.getElementById('descricaoAlterar').value = descricao;
        document.getElementById('QtdMinimaAlterar').value = qtdMinima;
        document.getElementById('quantidadeAlterar').value = quantidade;
    }   
})

modalAltInsumo.addEventListener('click', (event) => {
    if(event.target.textContent == 'Concluir'){
        modalAltInsumo.style.display = 'none'
        const insumo = {
            name: document.getElementById("nomeAlterar").value,
            quantity: document.getElementById("descricaoAlterar"),
            minQuantity: document.getElementById("QtdMinimaAlterar"),
            quantity: document.getElementById("quantidadeAlterar")
        }
        console.log(insumo);
    }
    if(event.target.textContent == 'Cancelar'){
        modalAltInsumo.style.display = 'none'
    }
})