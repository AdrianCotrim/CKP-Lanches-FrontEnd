var funcionarios = document.getElementById('funcionarios')
var pesquisa_nome = document.getElementById('pesquisa-nome')
var pesquisa_ordenar = document.getElementById('pesquisa_ordenar')

pesquisa_nome.addEventListener('input', (event) => {  

    const linhas = funcionarios.querySelectorAll('.linha');
    linhas.forEach(linha => {
        let nome_insumo = linha.querySelector("td:nth-child(1)").textContent.toLowerCase();
        if(!nome_insumo.includes(pesquisa_nome.value.toLowerCase())) linha.style.display = "none";
        else linha.style.display = "table-row";
    });
  }   
)

pesquisa_ordenar.addEventListener('input', (event) => {  

    const linhas = funcionarios.querySelectorAll('.linha');
    linhas.forEach(linha => {
        let numero_insumo = linha.querySelector("td:nth-child(3)").textContent;
        if(!numero_insumo.includes(pesquisa_numero.value)) linha.style.display = "none";
        else linha.style.display = "table-row";
    });
  }   
)