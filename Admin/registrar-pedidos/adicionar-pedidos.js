// Modal
var modalInfoPedido = document.getElementById("infoPedido");
var modalAddItens = document.getElementById("janelaRegisPedido");
var modalFecharPedido = document.getElementById("fecharPedido");
var btnAdd = document.getElementById("registrarPedido");
const obs = document.getElementById('observacao');


// ModalInfoPedido
// Exibe modal na tela
btnAdd.addEventListener("click", function() {
    modalInfoPedido.style.display = "flex"
});

// Habilita campos de "entrega"
const entrega = document.getElementById('entrega');
const tipoPedido = document.getElementById('tipoPedido');
tipoPedido.addEventListener('change', function() {
    if (this.value === 'entrega') {
        entrega.style.display = ""
    } else {
        entrega.style.display = "none"
    } 
});

modalInfoPedido.addEventListener("click", function(event) {
    var nomeCliente = document.getElementById("nomeCliente");
    var tipoPedido = document.getElementById("tipoPedido");
    var endereco = document.getElementById("endereco");
    var motoboy = document.getElementById("motoboy");
    var troco = document.getElementById("troco");
    var complemento = document.getElementById("complemento");
    var taxa = document.getElementById("taxa");

    const pedido = {
        nome_cliente: nomeCliente.value,
        tipoPedido: tipoPedido.value,
        endereco: endereco.value,
        motoboy: motoboy.value,
        troco: troco.value,
        complemento: complemento.value,
        taxa: taxa.value
    }
    console.log(pedido);


    if(event.target.textContent == 'Concluir' && tipoPedido.value != ""){
        nomeCliente.value = "";
        tipoPedido.value = "";
        endereco.value = "";
        motoboy.value = "";
        troco.value = "";
        complemento.value = "";
        taxa.value = "";

        modalInfoPedido.style.display = "none";
        modalAddItens.style.display = "flex";
    }
    if(event.target.textContent == 'Cancelar'){
        nomeCliente.value = "";
        tipoPedido.value = "";
        endereco.value = "";
        motoboy.value = "";
        troco.value = "";
        complemento.value = "";
        taxa.value = "";

        modalInfoPedido.style.display = "none";     
    }
})


// modalAddItens
let pedido = []

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
  
// Verifica o modal a cada 500ms
const modalChecker = setInterval(checaVisibilidadeModal, 500);

function listaId(pedido) {
    fetch("http://localhost:8080/produtos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        method: 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            let produtosIds = [];

            dados.forEach(element => {
                pedido.forEach(item => {
                    if(item.name == element.product_name){
                        produtosIds.push(element.product_id);
                    }
                })
            })
            console.log(produtosIds);  
        })
        .catch(erro => console.log(erro))
}

modalAddItens.addEventListener("click", function(event) {
    if(event.target.textContent == 'Voltar'){
        modalAddItens.style.display = "none"
        listaId(pedido);
    }
    if(event.target.textContent == 'Fechar'){
        modalAddItens.style.display = "none"
        modalFecharPedido.style.display = "flex"
        listaId(pedido);
    }
})

// Adiciona o pedido
function adicionaItem(item) {
    
    const produto = {
        name: item,
        obs: ""
    }

    pedido.push(produto)
    console.log(pedido);
    

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
        
        pedido.forEach((item) => {
            if(nome == item.name){
                const index = pedido.indexOf(item);
                produto.remove()
                pedido.splice(index, 1)
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
    const item = pedido.find(item => item.name == nomeProduto);
    

    item.obs = valor;
})
