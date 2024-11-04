const token = localStorage.getItem('authToken');
var idProdAlterar = 0;

document.addEventListener('DOMContentLoaded', () => {
  getName()
})

async function getName() {
  const usuarioLabel = document.getElementById('usuario');

  try {

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

  } catch (erro) {
    console.error(erro);
  }
}

// Traz produtos do banco
fetch("http://localhost:8080/produtos", {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(dados => {
    console.log(dados)
    var cardapio = document.getElementById("cardapio")

    dados.forEach(element => {
      fetch(`http://localhost:8080/produtos/imagens/${element.pathImage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`  // O token precisa ser enviado no cabeçalho
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao buscar a imagem');
          }
          return response.blob();
        })
        .then(dado => {
          const imagem = URL.createObjectURL(dado);

          let div = document.createElement("div");
          div.classList.add("card", "col-3", "m-3")
          div.innerHTML = `<img src="" class="mt-3">
          <p style="display: none;">${element.product_id}</p> 
            <h2 class="mt-3">${element.product_name}</h2>
            <p class="mt-1">${element.description}</p>
            <h3 class="align-items-right">R$${formatNumber(element.product_value.toFixed(2))}</h3>`
          const imgDocument = div.querySelector('img');
          imgDocument.src = imagem;  // Atualiza o src da imagem com a URL blob

          cardapio.appendChild(div);

          let modalAlteraProd = document.getElementById("alterarProd");
          let alteraNome = document.getElementById("alteraNome");
          let alteraDesc = document.getElementById("alteraDesc");
          let alteraValor = document.getElementById("alteraValor");
          let alteraInsumo = document.getElementById("listaInsumos");


          div.addEventListener("click", function () {
            modalAlteraProd.style.display = "flex"
            idProdAlterar = element.product_id;
            alteraNome.value = element.product_name;
            alteraDesc.value = element.description;
            alteraValor.value = element.product_value;

            element.supplies.forEach(element => {
              let novoInsumo = document.createElement("li");
              novoInsumo.classList.add("ms-1");
              let removerInsumo = document.createElement("i");
              novoInsumo.textContent = element.name;
              removerInsumo.classList.add("fa");
              removerInsumo.classList.add("fa-times");
              removerInsumo.id = `excluir-${element.name}`

              removerInsumo.addEventListener('click', () => {
                listaInsumos.removeChild(novoInsumo);
                insumos = insumos.filter(insumo => insumo !== novoInsumo.textContent)
              });

              alteraInsumo.appendChild(novoInsumo);
            });
          })
        })
        .catch(erro => console.error('Erro ao carregar a imagem:', erro));
    });
  })
  .catch(erro => console.error('Erro ao carregar os produtos:', erro));




function formatNumber(value) {
  // Criar um NumberFormat para o locale brasileiro
  const numberFormat = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2, // Número mínimo de casas decimais
    maximumFractionDigits: 2  // Número máximo de casas decimais
  });

  // Formatar o número
  return numberFormat.format(value);
}