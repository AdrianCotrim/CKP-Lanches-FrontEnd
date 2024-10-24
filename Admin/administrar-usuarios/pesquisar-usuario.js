var funcionarios = document.getElementById('funcionarios')
var pesquisa_nome = document.getElementById('pesquisa-nome')
var filtroFuncao = document.getElementById('funcao')
var filtroStatus = document.getElementById('status')

pesquisa_nome.addEventListener('input', (event) => {  

    const linhas = funcionarios.querySelectorAll('.linha');
    linhas.forEach(linha => {
        let nome_insumo = linha.querySelector("td:nth-child(1)").textContent.toLowerCase();
        if(!nome_insumo.includes(pesquisa_nome.value.toLowerCase())) linha.style.display = "none";
        else linha.style.display = "table-row";
    });
  }   
)

filtroFuncao.addEventListener("change", function(){
  const linhas = funcionarios.querySelectorAll('.linha');
  linhas.forEach((linha) => {
      let usuario_funcao = linha.querySelector("td:nth-child(4)").textContent
      if(!usuario_funcao.includes(filtroFuncao.value) && filtroFuncao.value != "todos") linha.style.display = "none";
      else linha.style.display = "table-row";
  })
})

filtroStatus.addEventListener("change", function(){
  const linhas = funcionarios.querySelectorAll('.linha');
  linhas.forEach((linha) => {
      let usuario_status = linha.querySelector("td:nth-child(5)").textContent
      if(!usuario_status.includes(filtroStatus.value) && filtroStatus.value != "todos") linha.style.display = "none";
      else linha.style.display = "table-row";
  })
})