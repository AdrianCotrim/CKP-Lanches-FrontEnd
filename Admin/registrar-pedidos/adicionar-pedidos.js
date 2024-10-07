// Modal
var modalInfoPedido = document.getElementById("infoPedido");
var modalAddPedido = document.getElementById("janelaRegisPedido");
var modalFecharPedido = document.getElementById("fecharPedido");
var btnAdd = document.getElementById("registrarPedido");
const obs = document.getElementById('obs');


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
        modalAddPedido.style.display = "flex";
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


// ModalAddPedido
function checaVisibilidadeModal() {
    // Verifica se o modal está visível (exemplo usando 'display')
    const isVisible = window.getComputedStyle(modalAddPedido).display !== 'none';
    
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
            console.log(dados);
            const itens = document.getElementById("itens");

            dados.forEach(element => {
                console.log(element.product_name);
                const option = document.createElement("option");
                const id = document.createElement("input")
                option.value = element.product_name;
                option.textContent = element.product_name;
                id.value = element.product_id;

                itens.appendChild(option)
                itens.appendChild(id)
            })
        })
        .catch(erro => console.log(erro))
  
      // Opcional: Para parar de monitorar após o modal ser exibido
      clearInterval(modalChecker);
    }
}
  
// Verifica o modal a cada 500ms
const modalChecker = setInterval(checaVisibilidadeModal, 500);

modalAddPedido.addEventListener("click", function(event) {
    if(event.target.textContent == 'Voltar'){
        modalAddPedido.style.display = "none"
    }
    if(event.target.textContent == 'Fechar'){
        modalAddPedido.style.display = "none"
        modalFecharPedido.style.display = "flex"
    }
})

// Adiciona o pedido
let pedido = []

function addItemToList(item) {
    // Adiciona item ao array
    const produto = {
        name: item,    
        obs: ""
    }
    
    pedido.push(produto)

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
            addItemToList(selectedItem);
            this.value = ''; // Limpa a seleção
        }
});

// Remove Produto do item
modalAddPedido.addEventListener("click", function(event){
    
    if(event.target.classList.contains("removerProduto")){
        var produto = event.target.parentElement.parentElement;
        var nome = produto.querySelector('p').textContent;
        console.log(nome);
        
        pedido.forEach((item) => {
            if(nome == item.name){
                var index = pedido.indexOf(item);
                
                produto.remove()
                pedido.splice(index, 1)
                console.log(pedido);
            };
        });
    };
});

let ultimoItemClicado
// Seleciona item
modalAddPedido.addEventListener("click", function(event){
    

    if(event.target.classList.contains("nome")){
        let itemAtual = event.target.parentElement.parentElement;
        let obs = itemAtual.querySelector(".obs");
        
        
        // Desmarca último item
        if(ultimoItemClicado && ultimoItemClicado.textContent != itemAtual.textContent){
            ultimoItemClicado.classList.remove("selecionado")   
        }
        itemAtual.classList.add("selecionado")

        nomes.forEach((nome) => {
            if(nome.classList.contains("selecionado")){
                itemIndex = pedido.findIndex(item => item.name === nome.textContent)
                obs.value = pedido[itemIndex].obs
            }
        })
        ultimoItemClicado = itemAtual   
    }
})

// Observação
obs.addEventListener('input', function() {
    const valor = obs.value; 
    let nomes = document.querySelectorAll(".nome")

    nomes.forEach((nome) => {
        if(nome.classList.contains("selecionado")){
            itemIndex = pedido.findIndex(item => item.name === nome.textContent)
            pedido[itemIndex].obs = valor
        }
    })
})
