var vendas = document.getElementById('vendas')
var pesquisa_numero = document.getElementById('pesquisa-numero')

pesquisa_numero.addEventListener('input', (event) => {  
    const linhas = vendas.querySelectorAll('.linha');
    linhas.forEach(linha => {
        let numero_venda = linha.querySelector("td:nth-child(1)").textContent;
        if(!numero_venda.includes(pesquisa_numero.value)) linha.style.display = "none";
        else linha.style.display = "table-row";
    });
  }   
)