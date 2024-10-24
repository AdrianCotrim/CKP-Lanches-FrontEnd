// Modal
var modalAddItens = document.getElementById("addProdutos");
const obs = document.getElementById('observacao');

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
            const itens = document.getElementById("itens");

            dados.forEach(element => {
                const option = document.createElement("option");
                option.value = element.product_name;
                option.textContent = element.product_name;


                itens.appendChild(option)
            })
        })
        .catch(erro => console.log(erro))
  
      // Opcional: Para parar de monitorar após o modal ser exibido
      clearInterval(modalChecker);
    }
}

function adicionaItensAoPedido(pedidoItens, pedido) {
    fetch("http://localhost:8080/produtos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            let produtos = [];

            dados.forEach(element => {
                pedidoItens, pedidoItens.forEach(item => {
                    if(item.name == element.product_name){
                        let nome = element.product_name;
                        let count = pedidoItens.filter(item => item.name === element.product_name).length;
                        let obs = item.obs;
                        
                        let produto = {
                            productName: nome,
                            quantity: count,
                            observacao: obs
                        }
                        produtos.push(produto);
                        console.log(produto);
                    }
                })
            })
            pedido["orderProductsDTOs"] = produtos;
            console.log(pedido);
        })
        .catch(erro => console.log(erro))
}

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

// modalAddItens
let pedidoItens = []

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

// Adiciona o pedido
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
                const index = pedido.indexOf(item);
                produto.remove()
                pedidoItens.splice(index, 1)
                console.log(pedido);
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
        const item = pedido.find(item => item.name == nomeProduto);
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