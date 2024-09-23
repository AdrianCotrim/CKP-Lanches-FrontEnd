// Obtém os modais
var modalAddFunc = document.getElementById("adicionarFunc");
var modalFiltrarMov = document.getElementById("filtrarMovimentacao");


// Obtém o botão que abre o modal
var btn = document.getElementById("addFunc");
var btn2 = document.getElementById("btnFiltrarMov");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementById("cancelar");
var span2 = document.getElementById("confirmar");

// Quando o usuário clicar no botão, abre o modal
btn.onclick = () => {
    modalAddFunc.style.display = "flex";
}

btn2.onclick = () => {
    modalFiltrarMov.style.display = "flex";
}

// Quando o usuário clicar no botão, fecha o modal
span.onclick = function () {
    modalAddInsumo.style.display = "none";
}

span.onclick = function () {
    modalFiltrarMov.style.display = "none";
}

span2.onclick = function () {
    modalAddInsumo.style.display = "none";
}






// Editar funcionário
var funcionarios = document.getElementById('funcionarios')
var modalEditFunc = document.getElementById('editarFunc')

estoque.addEventListener('click', (event) => {
      if(event.target.nodeName == 'TD'){
        modalEditFunc.style.display = 'flex'

        var insumo = event.target.parentNode
        let celulas = Array.from(insumo.children)

        var nome = celulas[0].textContent;
        var descricao = celulas[2].textContent;
        var qtdMinima = celulas[3].textContent;
        var quantidade = celulas[4].textContent;
            
        document.getElementById('nomeAlterar').value = nome;
        document.getElementById('emailAlterar').value = descricao;
        document.getElementById('senhaAlterar').value = qtdMinima;
        document.getElementById('nascAlterar').value = quantidade;
    }   
})

modalEditFunc.addEventListener('click', (event) => {
    if(event.target.textContent == 'Concluir'){
        modalEditFunc.style.display = 'none'
    }
    if(event.target.textContent == 'Cancelar'){
        modalEditFunc.style.display = 'none'
    }
    if (event.target.nodeName == 'TD') {
        modalEditFunc.style.display = 'flex'
    }
})

modalAddFunc.addEventListener('click', (event) => {
    if (event.target.textContent == 'Concluir') {
        modalAddFunc.style.display = 'none'
    }
    if (event.target.textContent == 'Cancelar') {
        modalAddFunc.style.display = 'none'
    }
})