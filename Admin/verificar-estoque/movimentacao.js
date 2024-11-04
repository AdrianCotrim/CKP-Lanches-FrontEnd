let btnAddMoviment = document.getElementById("abrirMovimentacao")
let btnCancelar = document.getElementById("cancelarMov")
let modalAddMoviment = document.getElementById("movimentacao")

btnAddMoviment.addEventListener("click", function(){
    modalAddMoviment.style.display = "flex";
});

btnCancelar.addEventListener("click", function(){
    modalAddMoviment.style.display = "none";
});



// Gerar PDF - Lista de compras
async function imprimirTabelaMovimentacoes() {
    // Cria uma nova janela para impressão
    const janelaImpressao = window.open('', '', 'height=1000,width=1000');
    console.log(janelaImpressao);
    

    let movimentacoes = null;

    try {
        const response = await fetch('http://localhost:8080/movimentacoes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if(!response.ok){
            const erro = await response.json();
            throw new Error(erro);
        }

        
        const data = await response.json()
        movimentacoes = data;
        console.log(movimentacoes);

    } catch (error) {
        console.log(error);
    }
    // Cria o conteúdo da nova tabela para impressão
    let tabelaFiltrada = '<table id="estoque"><thead><tr><th>ID</th><th>Data de Movimentação</th><th>Quantidade</th><th>Tipo</th><th>Nome do Insumo</tr></thead><tbody>';

    movimentacoes.forEach(movement => {
        tabelaFiltrada += `<tr>
            <td>${movement.id}</td>  <!-- ID -->
            <td>${movement.movementDate}</td>  <!-- Data de Movimentação -->
            <td>${movement.quantity}</td>  <!-- Quantidade -->
            <td>${movement.type}</td>  <!-- Tipo -->
            <td>${movement.supplyTableDTO.name}</td>  <!-- Nome do Insumo -->
        </tr>`;  // Adiciona apenas as colunas desejadas
    });

    tabelaFiltrada += '</tbody></table>';  // Fecha a tabela

    // Adiciona o HTML básico para a nova janela
    janelaImpressao.document.write('<html><head><link rel="stylesheet" type="text/css" href="../style.css"><link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><title>Imprimir Tabela</title>');
    janelaImpressao.document.write('<style>body{font-family: "Fredoka", sans-serif;} table { width: 100%; border: none} th, td {padding: 8px; text-align: left; } th { background-color: var(--cinza-bg); } img{width: 100%}</style>');
    janelaImpressao.document.write('</head><body>');
    janelaImpressao.document.write('<img src="/Imagens/cabecalho-lista-de-compras.png">');
    janelaImpressao.document.write(tabelaFiltrada);  // Adiciona a tabela filtrada
    janelaImpressao.document.write('</body></html>');

    // Fecha o documento e aguarda a renderização
    janelaImpressao.document.close();
    janelaImpressao.focus();

    // Executa o comando de impressão
    janelaImpressao.print();
}
