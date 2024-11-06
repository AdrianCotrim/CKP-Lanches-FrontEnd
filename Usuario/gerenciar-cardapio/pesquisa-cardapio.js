var cardapio = document.getElementById('cardapio')
var pesquisa_nome = document.getElementById('pesquisa-nome')

pesquisa_nome.addEventListener('input', (event) => {  

    const linhas = estoque.querySelectorAll('.linha');
    linhas.forEach(linha => {
        let nome_produto = linha.querySelector("h2").textContent.toLowerCase();
        if(!nome_produto.includes(pesquisa_nome.value.toLowerCase())) linha.style.display = "none";
        else linha.style.display = "table-row";
    });
  }   
)
