const token = localStorage.getItem('authToken');

// Traz produtos do banco
var getProdutos = () => {
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
                var divPai = document.createElement("div");
                divPai.classList.add("produto", "col-3", "m-3")
                var div = document.createElement("div");
                div.classList.add("card")
                div.innerHTML = `<img src="" class="mt-3"> 
                <p style="display: none">${element.product_id}</p>
                <h2 class="mt-3 produtoNome">${element.product_name}</h2>
                <p class="mt-1">${element.description}</p>
                <h3 class="align-items-right">R$${formatNumber(element.product_value.toFixed(2))}</h3>`
                const imgDocument = div.querySelector('img');
                imgDocument.src = imagem;  // Atualiza o src da imagem com a URL blob
                // Define o tamanho fixo da imagem
                
                divPai.appendChild(div);
                cardapio.appendChild(divPai);
            })
            .catch(erro => console.error('Erro ao carregar a imagem:', erro));
        });  
    })
    .catch(erro => console.error('Erro ao carregar os produtos:', erro));
}

var limparProdutos = () => {
    console.log("lool");
    cardapio.innerHTML = '';
}

getProdutos();

function formatNumber(value) {
    // Criar um NumberFormat para o locale brasileiro
    const numberFormat = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2, // Número mínimo de casas decimais
        maximumFractionDigits: 2  // Número máximo de casas decimais
    });
  
    // Formatar o número
    return numberFormat.format(value);
  }