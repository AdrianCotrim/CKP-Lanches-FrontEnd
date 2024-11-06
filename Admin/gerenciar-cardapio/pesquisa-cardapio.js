var pesquisa_nome = document.getElementById('pesquisa-nome')

pesquisa_nome.addEventListener('input', (event) => {

  const cards = cardapio.querySelectorAll('.produto');
  cards.forEach(card => {
    let nome_produto = card.querySelector(".produtoNome").textContent.toLowerCase();
    if (!nome_produto.includes(pesquisa_nome.value.toLowerCase())) card.style.display = "none";
    else card.style.display = "table-row";
  });
})