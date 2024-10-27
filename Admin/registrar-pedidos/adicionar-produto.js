// Modal
var modalAddItens = document.getElementById("addProdutos");
const obs = document.getElementById('observacao');
let pedidoItens = []

// Puxa os produtos para os selects
function checaVisibilidadeModal() {
    // Verifica se o modal está visível (exemplo usando 'display')
    const isVisible = window.getComputedStyle(modalAddItens).display !== 'none';
    
    if (isVisible) {
        console.log('Modal está visível');
        
        // Dispara a requisição fetch
        fetch("http://localhost:8080/produtos", {
            headers: {
                'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            const produtos = document.querySelector(".esquerda");
            const itens = document.getElementById("itens");
            let categorias = [];

            dados.forEach(element => {
                const option = document.createElement("option");
                option.value = element.product_name;
                option.textContent = element.product_name;
                itens.appendChild(option);

                const select = document.createElement("select");
                const nomeSelect = document.createElement("option");
                select.classList.add("select");
                select.classList.add("select--modal");

                if(!categorias.includes(element.category)){
                    categorias.push(element.category);
                
                    nomeSelect.disabled = true;
                    nomeSelect.selected = true;
                    nomeSelect.textContent = element.category;
                    select.appendChild(nomeSelect);
                    produtos.appendChild(select);
                }
                select.appendChild(option)
            })
        })
        .catch(erro => console.log(erro))
  
      // Opcional: Para parar de monitorar após o modal ser exibido
      clearInterval(modalChecker);
    }
}
// Verifica o modal a cada 500ms
const modalChecker = setInterval(checaVisibilidadeModal, 500);

modalAddItens.addEventListener("click", function(event) {
    if(event.target.textContent == 'Voltar'){
        modalAddItens.style.display = "none"
        adicionaItensAoPedido(pedidoItens, pedido);
    }
    if(event.target.textContent == 'Fechar'){
        modalAddItens.style.display = "none"
        modalFecharPedido.style.display = "flex"
        adicionaItensAoPedido(pedidoItens, pedido);
    }
})


function adicionaItensAoPedido(pedidoItens, pedido) {
    let produtos = [];
    const contagemProdutos = {};
    
    pedidoItens.forEach(item => {
        if(!contagemProdutos[item.name]){
            contagemProdutos[item.name] = {
                productName: item.name,
                quantity: 0,
                observacao: item.obs 
            };
        }
        contagemProdutos[item.name].quantity+=1;
    });

    produtos = Object.values(contagemProdutos);
    console.log(produtos);
    
    produtos.forEach((produto) => {
        pedido.orderDTO.orderProductDTOs.push(produto);
    })
    console.log(pedido); 
    
}

// Adiciona produtos a comanda
function adicionaItem(item) {
    
    const produto = {
        name: item,
        obs: ""
    }

    pedidoItens.push(produto)
    console.log(pedidoItens);
    

    // Adiciona item a lista
    const itemList = document.getElementById('itemList');

    const itemElement = document.createElement('div');
    const containerRemoverProduto = document.createElement('div')
    const removerProduto = document.createElement('i');
    const nome = document.createElement('p');
    const obs = document.createElement('p');
    
    itemElement.classList.add('item');
    containerRemoverProduto.classList.add('containerRemoverProduto');
    containerRemoverProduto.appendChild(removerProduto);
    removerProduto.classList.add('fa-solid');
    removerProduto.classList.add('fa-x');
    removerProduto.classList.add('removerProduto');
    nome.textContent = item;
    nome.classList.add('nome')
    obs.classList.add('obs')
    
    itemElement.appendChild(containerRemoverProduto);
    itemElement.appendChild(nome);
    itemElement.appendChild(obs);
    itemList.appendChild(itemElement);
    
}

// Adiciona o produto
document.getElementById('itens').addEventListener('change', function() {
    const selectedItem = this.value;
    if (selectedItem) {
            adicionaItem(selectedItem);
            this.value = ''; // Limpa a seleção
        }
});

// Remove Produto do item
modalAddItens.addEventListener("click", function(event){
    
    if(event.target.classList.contains("removerProduto")){
        
        const produto = event.target.parentElement.parentElement;
        const nome = produto.querySelector('.nome').textContent;
        
        pedidoItens.forEach((item) => {
            if(nome == item.name){
                const index = pedidoItens.indexOf(item);
                produto.remove()
                pedidoItens.splice(index, 1)
            };
        });
    };
});

let ultimoItemSelecionado
let itemSelecionado
// Seleciona item
modalAddItens.addEventListener("click", function(event){
    if(event.target.classList.contains("nome")){
        // Desmarca último item clicado
        if(ultimoItemSelecionado){
            ultimoItemSelecionado.classList.remove("selecionado");
        }
        itemSelecionado = event.target.parentElement;
        ultimoItemSelecionado = itemSelecionado;
        itemSelecionado.classList.add("selecionado");

        const nomeProduto = itemSelecionado.querySelector(".nome").textContent;
        const item = pedidoItens.find(item => item.name == nomeProduto);
        console.log(item);
        
        obs.value = item.obs;
        
    }
})

// Observação
obs.addEventListener('input', function() {
    const valor = obs.value; 
    const nomeProduto = itemSelecionado.querySelector(".nome").textContent;
    const item = pedidoItens.find(item => item.name == nomeProduto);

    item.obs = valor;
})