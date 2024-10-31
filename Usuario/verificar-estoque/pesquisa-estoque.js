var estoque = document.getElementById('estoque')
var pesquisa_nome = document.getElementById('pesquisa-nome')
var pesquisa_numero = document.getElementById('pesquisa-numero')

pesquisa_nome.addEventListener('input', (event) => {  

    const linhas = estoque.querySelectorAll('.linha');
    linhas.forEach(linha => {
        let nome_insumo = linha.querySelector("td:nth-child(1)").textContent.toLowerCase();
        let numero_insumo = linha.querySelector("td:nth-child(2)").textContent;
        if(!nome_insumo.includes(pesquisa_nome.value.toLowerCase()) && numero_insumo != pesquisa_nome.value) linha.style.display = "none";
        else linha.style.display = "table-row";
    });
  }   
)

// pesquisa_numero.addEventListener('input', (event) => {  

//     const linhas = estoque.querySelectorAll('.linha');
//     linhas.forEach(linha => {
//         let numero_insumo = linha.querySelector("td:nth-child(2)").textContent;
//         if(!numero_insumo.includes(pesquisa_numero.value)) linha.style.display = "none";
//         else linha.style.display = "table-row";
//     });
//   }   
// )