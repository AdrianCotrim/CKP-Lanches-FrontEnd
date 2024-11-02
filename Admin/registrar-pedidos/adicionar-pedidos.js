// Modal
var btnAdd = document.getElementById("registrarPedido");
var modalInfoPedido = document.getElementById("infoPedido");
var modalAddProd = document.getElementById("addProdutos");
var modalFecharPedido = document.getElementById("fecharPedido");
const listaPedidos = [];
const pedido = {
    orderDTO: {
      orderStatus: "PREPARANDO",
      customerName: "",
      exitMethod: "",
      paymentMethod: "",
      endDateTime: "",
      exitDateTime: "",
      orderProductDTOs: []
    },
    deliveryDTO: {
      motoboy: "",
      address: "",
      complement: null,
      change: "",
      fee: 0
    }
};


async function adicionaPedido(pedido) {
    listaPedidos.push(pedido);
    try {
        const response = await fetch("http://localhost:8080/pedidos", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); 
    } catch (erro) {
        console.log(erro);
    }
    console.log(listaPedidos);
    
}

// Exibe modal na tela
btnAdd.addEventListener("click", function() {
    modalInfoPedido.style.display = "flex"
});

// Habilita campos de "entrega"
const entrega = document.getElementById('entrega');
const tipoPedido = document.getElementById('tipoPedido');
tipoPedido.addEventListener('change', function() {
    if (this.value === 'ENTREGA') {
        entrega.style.display = ""
    } else {
        entrega.style.display = "none"
    } 
});

modalInfoPedido.addEventListener("click", function(event) {
    // Coleta dados do modal
    var nomeCliente = document.getElementById("nomeCliente").value;
    var tipoPedido = document.getElementById("tipoPedido").value;
    var motoboyNome = document.getElementById("motoboy").value;
    var endereco = document.getElementById("endereco").value;
    var complemento = document.getElementById("complemento").value;
    var troco = document.getElementById("troco").value;
    var taxa = document.getElementById("taxa").value;
    

    if(event.target.textContent == 'Concluir' && tipoPedido != ""){
        pedido["orderDTO"]["customerName"] = nomeCliente;
        pedido["orderDTO"]['exitMethod'] = tipoPedido;
        
        if(tipoPedido == "RETIRADA"){
            pedido["deliveryDTO"] = null;
            console.log(pedido);

            // Reseta os valores do modal
            nomeCliente.value = "";
            tipoPedido.value = "";
            endereco.value = "";
            motoboyNome.value = "";
            troco.value = "";
            complemento.value = "";
            taxa.value = "";

            //adicionaPedido(pedido);
            modalInfoPedido.style.display = "none";
            modalAddProd.style.display = "flex";
        }

        if(tipoPedido == "ENTREGA"){
            pedido["deliveryDTO"]["motoboy"] = motoboyNome;    
            pedido["deliveryDTO"]["address"] = endereco;    
            pedido["deliveryDTO"]["complement"] = complemento == "" ? null : complemento;   
            pedido["deliveryDTO"]["change"] = troco;    
            pedido["deliveryDTO"]["fee"] = taxa;
            console.log(pedido);

            // Reseta os valores do modal
            nomeCliente.value = "";
            tipoPedido.value = "";
            endereco.value = "";
            motoboyNome.value = "";
            troco.value = "";
            complemento.value = "";
            taxa.value = "";
            
            modalInfoPedido.style.display = "none";
            modalAddProd.style.display = "flex";
        }
    }
    
    if(event.target.textContent == 'Cancelar'){
        // Reseta os valores do modal
        nomeCliente.value = "";
        tipoPedido.value = "";
        endereco.value = "";
        motoboyNome.value = "";
        troco.value = "";
        complemento.value = "";
        taxa.value = "";

        modalInfoPedido.style.display = "none";     
    }
})

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

//formatação monetária

const input = document.getElementById('taxa');

input.addEventListener('input', function () {
    // Remove tudo que não é dígito
    let value = this.value.replace(/\D/g, '');

    // Formata o valor como moeda
    if (value) {
        value = (parseInt(value) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        this.value = value;
    } else {
        this.value = '';
    }
});
