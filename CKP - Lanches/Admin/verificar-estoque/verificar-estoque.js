// script.js

// Obtém o modal
var modal = document.getElementById("janelaAddProduto");

// Obtém o botão que abre o modal
var btn = document.getElementById("addProduto");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementsByClassName("botao-cancelar")[0];

// Quando o usuário clicar no botão, abre o modal
btn.onclick = function () {
    modal.style.display = "flex";
}

// Quando o usuário clicar no botão, fecha o modal
span.onclick = function () {
    modal.style.display = "none";
}

// Alterar Produto
var estoque = document.getElementById('estoque')
var modalAlterarProd = document.getElementById("alterarProduto")

estoque.addEventListener('click', (event) => {
    if(event.target.nodeName == 'TD'){
        modalAlterarProd.style.display  = 'flex'
    }
})

modalAlterarProd.addEventListener('click', (event) => {
    if(event.target.textContent == 'Concluir'){
        modalAlterarProd.style.display = 'none'
    }
    if(event.target.textContent == 'Cancelar'){
        modalAlterarProd.style.display = 'none'
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