// Gerar PDF - Lista de compras

function imprimirTabela() {
    // Cria uma nova janela para impressão
    const janelaImpressao = window.open('', '', 'height=1000,width=1000');

    // Obtém o conteúdo da tabela
    const tabela = document.getElementById('estoque');
    const insumos = tabela.querySelectorAll('.linha');

    
    
    // Adiciona o HTML básico para a nova janela
    janelaImpressao.document.write('<html><head><link rel="stylesheet" type="text/css" href="../style.css"><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><title>Imprimir Tabela</title>');
    janelaImpressao.document.write('<style>body{font-family: "Fredoka", sans-serif;} table { width: 100%; border: none} th, td {padding: 8px; text-align: left; } th { background-color: var(--cinza-bg); } img{width: 100%}</style>');
    janelaImpressao.document.write('</head><body >');
    janelaImpressao.document.write('<img src="/Imagens/cabecalho-lista-de-compras.png">')
    janelaImpressao.document.write('<table id="estoque" class="table table-hover"><thead><tr><th>Nome</th><th>ID</th><th>Descrição</th><th>Qtd Mínima</th><th>Qtd Máxima</th><th>Quantidade</th></tr></thead><tbody></tbody>');
    insumos.forEach(insumo => {
        let quantidade = insumo.querySelector("td:nth-child(6)").textContent;
        let quantidadeMinima = insumo.querySelector("td:nth-child(4)").textContent;
        if(quantidade <= quantidadeMinima){
            janelaImpressao.document.write(insumo.outerHTML);
        }
    })
    janelaImpressao.document.write('</table></body></html>');

    // Fecha o documento e aguarda a renderização
    janelaImpressao.document.close();
    janelaImpressao.focus();

    // Executa o comando de impressão
    janelaImpressao.print();
}


// Gerar PDF - Relatório de movimentações