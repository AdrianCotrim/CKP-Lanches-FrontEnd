const token = localStorage.getItem('authToken');
const infoEntrega = document.getElementById('info-entrega');
var entregasArray = [];
const pedidosClass = document.querySelectorAll(".pedido")
const pedidos = document.getElementById("pedidos");
const entregas = document.getElementById("lista-entrega");
const temEntregaMsg = document.getElementById('tem-entregas-conteiner');
let pedidoSelecionado = null;

var buscarPedidos = () => {
    fetch("http://localhost:8080/pedidos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {
        dados.forEach(pedido => {
            if(pedido.deliveryDTO != null){
                temEntregaMsg.style.display = 'none';
                entregasArray.push(pedido);
                buscaEntregas(pedido);
                console.log("Entro nos pedidos");
            }
            })
        if(entregasArray.length === 0){
            console.log("Não tem entregas");
            temEntregaMsg.style.display = 'flex';
            console.log(temEntregaMsg);
            
        }
    })
    .catch(erro => console.log(erro))
    
    console.log(entregasArray);
}

buscarPedidos();

var limparEntregas = () => {
    entregas.innerHTML = '';
}


var buscaEntregas = (pedido) => {
    const entregaDiv = document.createElement("div");
    const entregaCont = document.createElement("div");
    const nomeCliente = document.createElement("p");
    const numero = document.createElement("label");
    const valor = document.createElement("label");
    const situacaoPedido = document.createElement("div");

    if(pedido.orderStatus != 'FINALIZADO'){
        entregaDiv.classList.add("pedido", "mt-3", "me-2", "ms-2", "mb-1");
        entregaCont.classList.add("info-pedido");
        nomeCliente.classList.add("nome-cliente")
        numero.classList.add("pe-5");
        valor.classList.add("valor");
        situacaoPedido.classList.add("situacao-pedido");

        if(pedido.orderStatus == 'PRONTO'){
            situacaoPedido.style.backgroundColor = "var(--azul)";
        } else{
            situacaoPedido.style.backgroundColor = "var(--vermelho-principal)";
        }

        nomeCliente.textContent = pedido.customerName;
        numero.textContent = "Nº "+pedido.orderId;
        valor.textContent = "R$"+pedido.totalValue.toFixed(2);

        entregaDiv.addEventListener("click", (event) => {
            // Exibe as informações de entrega
            console.log(entregaDiv);
            botaoAbrirAlteraEntrega.style.display = 'block';
            infoEntrega.style.display = 'block';
            document.getElementById('info-entrega').style.display = 'block';

            pedidoSelecionado = entregaDiv;
    
            // Define 'pedidoSelecionado' como o elemento clicado com a classe 'pedido'
            // event.currentTarget já se refere ao 'pedidoSelecionado'
            const nome = entregaDiv.querySelector(".info-pedido").firstChild.textContent.trim();
    
            // Procura a entrega correspondente no array de entregas
            entregasArray.forEach(entrega => {
                if (entrega.customerName === nome) {
                    // Atualiza os valores dos campos com as informações da entrega
                    id_pedido.value = entrega.orderId;
                    id_entrega.value = entrega.deliveryDTO.id;
                    cliente.textContent = entrega.customerName;
                    endereco.textContent = entrega.deliveryDTO.address;
                    motoboy.textContent = entrega.deliveryDTO.motoboy;
                    complemento.textContent = entrega.deliveryDTO.complement ? entrega.deliveryDTO.complement : "*";
                    itens.innerHTML = "";
                    entrega.orderProductTableDTOs.forEach(item => {
                        const itemP = document.createElement("p");
                        itemP.textContent = `${item.quantity}x ${item.productTableDTO.product_name}`;
                        itens.append(itemP)
                    })
                    formaPagamento.textContent = entrega.paymentMethod;                    
                    valorPedido.textContent = "R$" + entrega.subValue.toFixed(2);
                    valorTaxa.textContent = "R$" + entrega.deliveryDTO.fee.toFixed(2);
                    valorTotal.textContent = "R$" + entrega.totalValue.toFixed(2);
                }
            });
        });

        entregaCont.appendChild(nomeCliente);
        entregaCont.appendChild(numero);
        entregaCont.appendChild(valor);
        entregaDiv.appendChild(entregaCont);
        entregaDiv.appendChild(situacaoPedido);
        
        entregas.appendChild(entregaDiv);
    }
    
}
/////////
const id_pedido = document.getElementById('id-pedido');
const id_entrega = document.getElementById('id-entrega');
const cliente = document.getElementById("cliente");
const endereco = document.getElementById("endereco");
const motoboy = document.getElementById("motoboy");
const complemento = document.getElementById("complemento");
const itens = document.getElementById("itens");
const formaPagamento = document.getElementById("formaPagamento");
const valorPedido = document.getElementById("valorPedido");
const valorTaxa = document.getElementById("valorTaxa");
const valorTotal = document.getElementById("valorTotal");

// Seleciona todas as divs com a classe 'pedido' e adiciona o evento de clique
pedidosClass.forEach(pedidoSelecionado => {
    pedidoSelecionado.addEventListener("click", (event) => {
        // Exibe as informações de entrega
        console.log(pedidoSelecionado)
        infoEntrega.style.display = 'block';
        botaoAbrirAlteraEntrega.style.display = 'block';
        document.getElementById('info-entrega').style.display = 'block';

        // Define 'pedidoSelecionado' como o elemento clicado com a classe 'pedido'
        // event.currentTarget já se refere ao 'pedidoSelecionado'
        const nome = pedidoSelecionado.querySelector(".info-pedido").firstChild.textContent.trim();

        // Procura a entrega correspondente no array de entregas
        entregasArray.forEach(entrega => {
            if (entrega.customerName === nome) {
                // Atualiza os valores dos campos com as informações da entrega
                id_pedido.value = entrega.orderId;
                id_entrega.value = entrega.deliveryDTO.id;
                cliente.textContent = entrega.customerName;
                endereco.textContent = entrega.deliveryDTO.address;
                motoboy.textContent = entrega.deliveryDTO.motoboy;
                complemento.textContent = entrega.deliveryDTO.complement ? entrega.deliveryDTO.complement : "*";
                valorPedido.textContent = "R$" + entrega.subValue.toFixed(2);
                valorTaxa.textContent = "R$" + entrega.deliveryDTO.fee.toFixed(2);
                valorTotal.textContent = "R$" + entrega.totalValue.toFixed(2);
            }
        });
    });
});


