// Obtém o modais
var modalAddInsumo = document.getElementById("adicionarInsumo");


// Obtém o botão que abre o modal
var btn = document.getElementById("addProduto");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementById("cancelar");
var span2 = document.getElementById("confirmar");

// Quando o usuário clicar no botão, abre o modal
btn.onclick = () => {
    modalAddInsumo.style.display = "flex";
}

// Quando o usuário clicar no botão, fecha o modal
span.onclick = function () {
    modalAddInsumo.style.display = "none";
}

span2.onclick = function () {
    modalAddInsumo.style.display = "none";
}

// Alterar Insumo
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
    }
    if(event.target.textContent == 'Cancelar'){
        modalAltInsumo.style.display = 'none'
    }
})

// Gerar PDF - Lista de compras

document.getElementById('listaCompras').addEventListener('click', async () => {
    const iframe = document.getElementById('pdfContent');
    const content = iframe.contentDocument || iframe.contentWindow.document;

    const options = {
        margin: 0.5,
        filename: 'lista_de_compras.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(content.body).set(options).save();
});


// Gerar PDF - Relatório de movimentações