document.addEventListener('DOMContentLoaded', () => {
    getName()
  })
  
  async function getName() {
    const usuarioLabel = document.getElementById('usuario');
  
    try{
  
      const response = await fetch("http://localhost:8080/user/name", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      usuarioLabel.textContent = data.username;
  
    } catch(erro){
      console.error(erro);
    }
  }




// Gerar PDF - Lista de compras
function imprimirTabela() {
    // Cria uma nova janela para impressão
    const janelaImpressao = window.open('', '', 'height=1000,width=1000');

    let trs = document.querySelectorAll('tbody tr');

    // Converte NodeList em array para poder usar o método filter
    trs = Array.from(trs).filter(tr => {
        let celulas = Array.from(tr.children);
        const quantidade_minima = parseFloat(celulas[3].textContent);  // Converte para número
        const quantidade = parseFloat(celulas[5].textContent);  // Converte para número

        // Verifica se a quantidade é menor que a quantidade mínima
        return quantidade < quantidade_minima;  // Retorna verdadeiro se a quantidade for menor
    });

    // Cria o conteúdo da nova tabela para impressão
    let tabelaFiltrada = '<table id="estoque"><thead><tr><th>Nome</th><th>ID</th><th>Descrição</th><th>Quantidade Mínima</th><th>Quantidade Atual</th></tr></thead><tbody>';

    trs.forEach(tr => {
        let celulas = Array.from(tr.children);
        tabelaFiltrada += `<tr>
            <td>${celulas[0].textContent}</td>  <!-- Nome -->
            <td>${celulas[1].textContent}</td>  <!-- ID -->
            <td>${celulas[2].textContent}</td>  <!-- Descrição -->
            <td>${celulas[3].textContent}</td>  <!-- Quantidade Mínima -->
            <td>${celulas[5].textContent}</td>  <!-- Quantidade Atual -->
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