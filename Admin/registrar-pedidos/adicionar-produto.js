// Modal
var modalAddItens = document.getElementById("addProdutos");
const obs = document.getElementById('observacao');
var pedidoItens = []
let idPedidoAlterar = null;

modalAddItens.addEventListener("click", function(event) {
    if(event.target.textContent == 'Voltar'){
        if(pedidoItens.length > 0){
            modalAddItens.style.display = "none"
            pedidoItens = [];
            document.getElementById('itemList').innerHTML = "";
            
        }
        else {
            document.getElementById("mensagemErro").style.display = "block"
        }
    }
    if(event.target.textContent == 'Concluir'){
        if(pedidoItens.length > 0){
            modalAddItens.style.display = "none"
            adicionaItensAoPedido(pedidoItens, pedido);
        }
        else {
            document.getElementById("mensagemErro").style.display = "block"
        }
        
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
    
    if(idPedidoAlterar == null){
        produtos.forEach((produto) => {
            pedido.orderDTO.orderProductDTOs.push(produto);
        })
        pedido.orderDTO.endDateTime = "2024-10-14T11:00";
        pedido.orderDTO.exitDateTime = "2024-10-14T11:00";
        pedido.orderDTO.paymentMethod = "a pagar";
        pedidoItens = [];
        
        fetch("http://localhost:8080/pedidos", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            method: 'POST',
            body: JSON.stringify(pedido)
        })
        .then(response =>{
            window.location.reload();
            console.log(response)
        })
        .catch(erro => console.log(erro))
    }
    else{
        const orderProductDTOs = [];
        produtos.forEach(prod => {
            orderProductDTOs.push(prod);
        })
        console.log(orderProductDTOs);
        idPedidoAlterar = null;
        pedidoItens = [];

        fetch(`http://localhost:8080/pedidos/${idPedidoAlterar}/itens`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(orderProductDTOs)
        })
        .then(response =>{
            console.log(response)
        })
        .catch(erro => console.log(erro))
    }
}

// Adiciona produtos a comanda
function adicionaItem(item, alterar) {
    const produto = {
        name: item,
        obs: ""
    }
    if(alterar == 0){
        produto.name = item;
        produto.obs = "";
    }
    if(alterar == 1){
        produto.name = item.productTableDTO.product_name;
        produto.obs = item.observacao;
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
    nome.textContent = produto.name;
    nome.classList.add('nome')
    obs.classList.add('obs')
    
    itemElement.appendChild(containerRemoverProduto);
    itemElement.appendChild(nome);
    itemElement.appendChild(obs);
    itemList.appendChild(itemElement);
    
}

// Puxa os produtos para os selects
function checaVisibilidadeModal() {
    // Verifica se o modal está visível (exemplo usando 'display')
    const isVisible = window.getComputedStyle(modalAddItens).display !== 'none';
    
    if (isVisible) {
        console.log('Modal está visível');
        
        if(pedidoAlterar){
            console.log(pedidoAlterar);
        }

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
            const categorias = [];
            const listaProdutos = [];

            dados.forEach(element => {
                const option = document.createElement("option");
                option.value = element.product_name;
                option.textContent = element.product_name;

                if(!categorias.includes(element.category)){
                    categorias.push(element.category);

                    const select = document.createElement("select");
                    select.classList.add("select");
                    select.classList.add("select--modal");
                    select.id = element.category;
                    select.onchange = function(){
                        adicionaItem(this.value, 0);
                        this.value = ""; 
                    }
                    const nomeSelect = document.createElement("option");
                    nomeSelect.disabled = true;
                    nomeSelect.selected = true;
                    nomeSelect.textContent = element.category;

                    select.appendChild(nomeSelect);
                    listaProdutos.push(select)
                    produtos.appendChild(select);
                }

                listaProdutos.forEach(lista => {
                    if(element.category == lista.id){
                        const index = listaProdutos.indexOf(lista);
                        listaProdutos[index].appendChild(option)
                    }
                })
                //itens.appendChild(option);
                
            })
        })
        .catch(erro => console.log(erro))
        

      // Opcional: Para parar de monitorar após o modal ser exibido
      clearInterval(modalChecker);
    }
    
}
// Verifica o modal a cada 500ms
const modalChecker = setInterval(checaVisibilidadeModal, 500);

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