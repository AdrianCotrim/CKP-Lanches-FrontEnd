// Modal
var modalAddProdutos = document.getElementById("addProdutos")
const modalAlterarInfoPedido = document.getElementById("alterarInfoPedido")
var pedidoAlterar = null;

// Exibe modal na tela
pedidos.addEventListener('click', (event) => {
  let linha = null;
  let pedidoId = null;

  if(event.target.nodeName == 'TD'){
        modalAlterarInfoPedido.style.display = 'flex'
        linha = event.target.parentNode;
        pedidoId = linha.children[1].textContent;

        pedidosArray.forEach(pedido => {
          if(pedido.orderId == pedidoId){
            pedidoAlterar = pedido;
            console.log(pedidoAlterar);

            const nomeAlterar = document.getElementById("nomeAlterar");
            const andamentoAlterar = document.getElementById("andamentoAlterar");
            const formaPagamentoAlterar = document.getElementById("formaPagamentoAlterar");
            const tipoPedidoAlterar = document.getElementById("tipoPedidoAlterar");
            const enderecoAlterar = document.getElementById("enderecoAlterar");
            const motoboyAlterar = document.getElementById("motoboyAlterar");
            const trocoAlterar = document.getElementById("trocoAlterar");
            const complementoAlterar = document.getElementById("complementoAlterar");
            const taxaAlterar = document.getElementById("taxaAlterar");
            
            
            nomeAlterar.value = pedido.customerName;
            andamentoAlterar.value = pedido.orderStatus;
            formaPagamentoAlterar.value = pedido.totalValue;
            tipoPedidoAlterar.value = pedido.exitMethod;
            if(tipoPedidoAlterar.value == 'ENTREGA'){
              document.getElementById('entregaAlterar').style.display = "block";
              enderecoAlterar.value = pedido.deliveryDTO.address;
              motoboyAlterar.value = pedido.deliveryDTO.motoboy;
              trocoAlterar.value = pedido.deliveryDTO.change;
              complementoAlterar.value = pedido.deliveryDTO.complement;
              taxaAlterar.value = pedido.deliveryDTO.fee;
            }
            else{
              document.getElementById('entregaAlterar').style.display = "none";
            }
            
          }
        })
  }

  if(event.target.textContent == "Itens"){
    modalAddProdutos.style.display = "flex";
    linha = event.target.parentNode.parentNode;
    pedidoId = linha.children[1].textContent;
    
    pedidosArray.forEach(pedido => {
      if(pedido.orderId == pedidoId){
        pedidoAlterar = pedido
      }
    })
  } 

})

modalAlterarInfoPedido.addEventListener("click", function(event) {
  if(event.target.textContent == 'Concluir'){
    pedidoAlterar.customerName = nomeAlterar.value;
    pedidoAlterar.orderStatus = andamentoAlterar.value;
    pedidoAlterar.totalValue = formaPagamentoAlterar.value;
    pedidoAlterar.exitMethod = tipoPedidoAlterar.value;

    if(pedidoAlterar.exitMethod == 'ENTREGA'){
      pedidoAlterar.deliveryDTO.address = enderecoAlterar.value;
      pedidoAlterar.deliveryDTO.motoboy = motoboyAlterar.value;
      pedidoAlterar.deliveryDTO.change = trocoAlterar.value;
      pedidoAlterar.deliveryDTO.complement = complementoAlterar.value;
      pedidoAlterar.deliveryDTO.fee = taxaAlterar.value;

    }
    
    console.log(pedidoAlterar);
    
    fetch(`http://localhost:8080/pedidos/${pedidoAlterar.orderId}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(pedidoAlterar)
    })
    .then(response => {
      if (!response.ok) {
        // Lança um erro com o código de status para tratar respostas de erro
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
      console.log("Pedido atualizado com sucesso:", data);
      // window.location.reload(); // Descomente esta linha para recarregar a página, se necessário
    })
    .catch(error => {
      console.error("Erro:", error.message);
      if (error.message.includes("403")) {
        console.error("Erro 403: Acesso negado. Verifique suas permissões.");
      }
    });
    

    modalAlterarInfoPedido.style.display = "none"
  }

  if(event.target.textContent == 'Deletar'){
    event.preventDefault();
    const produtoId = pedidoAlterar.children[1].textContent;
    fetch(`http://localhost:8080/pedidos/${produtoId}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type':'application/json'
      },
      method: 'DELETE',
    })
    .then(response =>{
        console.log(response)
        window.location.reload()
    })
    .catch(erro => console.log(erro))
  }

  if(event.target.textContent == 'Cancelar'){
    pedidoAlterar = null;
    modalAlterarInfoPedido.style.display = "none"
  }
})