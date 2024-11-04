const lotes = document.getElementById("lotes");
const pesquisa_numero = document.getElementById("pesquisa-numero");

pesquisa_numero.addEventListener('input', (event) => {  
    const linhas = lotes.querySelectorAll('.linha');
    linhas.forEach(linha => {
        let id_lote = linha.children[0].textContent;
        if(!id_lote.includes(pesquisa_numero.value)) linha.style.display = "none";
        else linha.style.display = "table-row";
    });
  }
     
)

