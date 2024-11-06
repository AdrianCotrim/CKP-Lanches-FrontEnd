const token = localStorage.getItem('authToken');
const infoEntrega = document.getElementById('info-entrega');
const entregasArray = [];
const pedidosClass = document.querySelectorAll(".pedido")
const pedidos = document.getElementById("pedidos");
const entregas = document.getElementById("lista-entrega");
pedidos.style.cursor = "pointer"
let pedidoSelecionado = null;

fetch("http://localhost:8080/pedidos", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => dados.forEach(pedido => {
    if(pedido.deliveryDTO != null){
        entregasArray.push(pedido);
        buscaEntregas(pedido);
    }
    }))
.catch(erro => console.log(erro))

console.log(entregasArray);


function buscaEntregas(pedido){
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
        valor.textContent = "R$"+pedido.totalValue;

        entregaDiv.addEventListener("click", (event) => {
            // Exibe as informações de entrega
            console.log(entregaDiv)
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
                    id.value = entrega.orderId;
                    cliente.textContent = entrega.customerName;
                    endereco.textContent = entrega.deliveryDTO.address;
                    complemento.textContent = entrega.deliveryDTO.complement ? entrega.deliveryDTO.complement : "*";
                    valorPedido.textContent = "R$" + entrega.subValue;
                    valorTaxa.textContent = "R$" + entrega.deliveryDTO.fee;
                    valorTotal.textContent = "R$" + entrega.totalValue;
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
const id = document.getElementById('id-entrega');
const cliente = document.getElementById("cliente");
const endereco = document.getElementById("endereco");
const complemento = document.getElementById("complemento");
const valorPedido = document.getElementById("valorPedido");
const valorTaxa = document.getElementById("valorTaxa");
const valorTotal = document.getElementById("valorTotal");

// Seleciona todas as divs com a classe 'pedido' e adiciona o evento de clique
pedidosClass.forEach(pedidoSelecionado => {
    pedidoSelecionado.addEventListener("click", (event) => {
        // Exibe as informações de entrega
        console.log(pedidoSelecionado)
        infoEntrega.style.display = 'block';
        document.getElementById('info-entrega').style.display = 'block';

        // Define 'pedidoSelecionado' como o elemento clicado com a classe 'pedido'
        // event.currentTarget já se refere ao 'pedidoSelecionado'
        const nome = pedidoSelecionado.querySelector(".info-pedido").firstChild.textContent.trim();

        // Procura a entrega correspondente no array de entregas
        entregasArray.forEach(entrega => {
            if (entrega.customerName === nome) {
                // Atualiza os valores dos campos com as informações da entrega
                id.value = entrega.orderId;
                cliente.textContent = entrega.customerName;
                endereco.textContent = entrega.deliveryDTO.address;
                complemento.textContent = entrega.deliveryDTO.complement ? entrega.deliveryDTO.complement : "*";
                valorPedido.textContent = "R$" + entrega.subValue;
                valorTaxa.textContent = "R$" + entrega.deliveryDTO.fee;
                valorTotal.textContent = "R$" + entrega.totalValue;
            }
        });
    });
});


