// Modal
const modalAlterarInfoPedido = document.getElementById("alterarInfoPedido");
var modalAddProdutos = document.getElementById("addProdutos");
var tipoPedidoSelect = document.getElementById("tipoPedidoAlterar");
var modalFecharPedido = document.getElementById("fecharPedido");
var idPedidoAlterar = null;
var pedidoAlterar = null
let pedidoEmQuestao = null;
let novoPedidoAlterar = {
  id: 30,
  orderStatus: "PREPARANDO",
  customerName: "",
  exitMethod: "",
  paymentMethod: "",
  endDateTime: "",
  exitDateTime: "",
  orderProductDTOs: [],
  deliveryDTO: {
    motoboy: "",
    address: "",
    complement: null,
    change: "",
    fee: 0
  }
}

// Coloca os valores do pedido nos inputs
const nomeAlterar = document.getElementById("nomeAlterar");
const andamentoAlterar = document.getElementById("andamentoAlterar");
const formaPagamentoAlterar = document.getElementById("formaPagamentoAlterar");
const tipoPedidoAlterar = document.getElementById("tipoPedidoAlterar");
const enderecoAlterar = document.getElementById("enderecoAlterar");
const motoboyAlterar = document.getElementById("motoboyAlterar");
const trocoAlterar = document.getElementById("trocoAlterar");
const complementoAlterar = document.getElementById("complementoAlterar");
const taxaAlterar = document.getElementById("taxaAlterar");

document.addEventListener('DOMContentLoaded', () => {
  tipoPedidoSelect.value = "TIPO"
})

// Exibe modal na tela
pedidos.addEventListener('click', (event) => {
  let linha = null;
  let pedidoId = null;

  if (event.target.nodeName == 'TD') {
    modalAlterarInfoPedido.style.display = 'flex'
    linha = event.target.parentNode;
    pedidoId = linha.children[1].textContent;

    pedidosArray.forEach(pedido => {
      if (pedido.orderId == pedidoId) {
        pedidoEmQuestao = pedido;
        pedidoAlterar = pedido;
        // Cria o pedido a ser alterado
        novoPedidoAlterar.id = pedido.orderId;
        novoPedidoAlterar.customerName = pedido.customerName;
        novoPedidoAlterar.exitMethod = pedido.exitMethod;
        novoPedidoAlterar.endDateTime = pedido.endDateTime;
        novoPedidoAlterar.exitDateTime = pedido.exitDateTime;
        pedido.orderProductTableDTOs.forEach(produto => novoPedidoAlterar.orderProductDTOs.push({
          productName: produto.productTableDTO.product_name,
          quantity: produto.quantity,
          observacao: produto.observacao
        }));
        if(pedido.deliveryDTO){
          novoPedidoAlterar.deliveryDTO.motoboy = pedido.deliveryDTO.motoboy;
          novoPedidoAlterar.deliveryDTO.address = pedido.deliveryDTO.address;
          novoPedidoAlterar.deliveryDTO.complement = pedido.deliveryDTO.complement;
          novoPedidoAlterar.deliveryDTO.change = pedido.deliveryDTO.change;
          novoPedidoAlterar.deliveryDTO.fee = pedido.deliveryDTO.fee;
        }
        else{
          novoPedidoAlterar.deliveryDTO = null;
        }
        console.log(novoPedidoAlterar);

        


        nomeAlterar.value = pedido.customerName;
        andamentoAlterar.value = pedido.orderStatus;
        formaPagamentoAlterar.value = pedido.paymentMethod;
        //tipoPedidoAlterar.value = pedido.exitMethod;

        // Mostra inputs de entrega
        if (tipoPedidoAlterar.value == 'ENTREGA') {
          document.getElementById('entregaAlterar').style.display = "flex";
          if(pedido.deliveryDTO != null){
            enderecoAlterar.value = pedido.deliveryDTO.address;
            motoboyAlterar.value = pedido.deliveryDTO.motoboy;
            trocoAlterar.value = pedido.deliveryDTO.change;
            complementoAlterar.value = pedido.deliveryDTO.complement;
            taxaAlterar.value = pedido.deliveryDTO.fee;
          }
        }
        else if (tipoPedidoAlterar.value == 'RETIRADA') {
          document.getElementById('entregaAlterar').style.display = "none";
        }

      }
    })

    console.log(pedidoAlterar);
  }

  if (event.target.textContent == "Itens") {
    modalAddProdutos.style.display = "flex";
    linha = event.target.parentNode.parentNode;
    pedidoId = linha.children[1].textContent;
    idPedidoAlterar = pedidoId;

    pedidosArray.forEach(pedido => {
      if(pedido.orderId == pedidoId){
        pedido.orderProductTableDTOs.forEach(item => {
          for(let i = 0; i < item.quantity; i++){
            adicionaItem(item, 1);
          }
        })
      }
    })
  }
});

var btnVoltar = document.getElementById("voltar");

btnVoltar.addEventListener("click", function(){
    document.getElementById("telaAlterarInfoPedido").style.display = "flex";
    document.getElementById("entregaAlterar").style.display = "none";

    enderecoAlterar.value = '';
    motoboyAlterar.value = '';
    complementoAlterar.value = '';
    taxaAlterar.value = '';
    document.getElementById('msg-erro-alterar').textContent = '';
    document.getElementById('msg-erro-entrega').textContent = '';
    tipoPedidoSelect.value = '';
})

tipoPedidoSelect.addEventListener('change', (event) => {
  if(tipoPedidoSelect.value == "ENTREGA"){
    document.getElementById('msg-erro-entrega').textContent = '';
    document.getElementById("telaAlterarInfoPedido").style.display = "none";
    document.getElementById("entregaAlterar").style.display = "flex";
    if(pedidoEmQuestao.deliveryDTO != null){
      enderecoAlterar.value = pedidoEmQuestao.deliveryDTO.address;
      motoboyAlterar.value = pedidoEmQuestao.deliveryDTO.motoboy;
      trocoAlterar.value = pedidoEmQuestao.deliveryDTO.change;
      complementoAlterar.value = pedidoEmQuestao.deliveryDTO.complement;
      taxaAlterar.value = pedidoEmQuestao.deliveryDTO.fee;
    } 
  }
})

var btnAlterar = document.getElementById("alterarPedido");

function mensagemErroPadrao(mensagem){
  const msgErroDiv = document.getElementById('msg-erro-alterar');
  document.getElementById('msg-erro-entrega').textContent = mensagem;
  document.getElementById('msg-erro-entrega').style.display = 'block';
  msgErroDiv.style.display = 'block';
  msgErroDiv.textContent = mensagem;
  throw new Error(mensagem);
}

function atualizarPedido(){

  //Mensagens de erro (Validação)
  if(tipoPedidoSelect.value != 'ENTREGA' && tipoPedidoSelect.value != 'RETIRADA') mensagemErroPadrao("Selecione um tipo de pedido (Entrega ou Retirada).");
  if(nomeAlterar.value == '' || nomeAlterar.value == null) mensagemErroPadrao("Você deve colocar o nome do cliente!");
  if(formaPagamentoAlterar.value == '' || formaPagamentoAlterar.value == null) mensagemErroPadrao("Você deve colocar uma forma de pagamento!");

  novoPedidoAlterar.customerName = nomeAlterar.value;
    novoPedidoAlterar.orderStatus = andamentoAlterar.value;
    novoPedidoAlterar.paymentMethod = formaPagamentoAlterar.value;
    novoPedidoAlterar.exitMethod = tipoPedidoAlterar.value;

    if (tipoPedidoSelect.value == 'ENTREGA') {
      novoPedidoAlterar.exitMethod = 'ENTREGA';
      novoPedidoAlterar.deliveryDTO = {};

      if(enderecoAlterar.value == '' || enderecoAlterar.value == null) mensagemErroPadrao("Você deve colocar um endereço!");
      if(motoboyAlterar.value == '' || motoboyAlterar.value == null) mensagemErroPadrao("Você deve colocar um motoboy!");
      if(taxaAlterar.value == '' || taxaAlterar.value == null) mensagemErroPadrao("Você deve colocar uma taxa!");

      novoPedidoAlterar.deliveryDTO.address = enderecoAlterar.value;
      novoPedidoAlterar.deliveryDTO.motoboy = motoboyAlterar.value;
      novoPedidoAlterar.deliveryDTO.change = trocoAlterar.value;
      novoPedidoAlterar.deliveryDTO.complement = complementoAlterar.value;
      const value = (taxaAlterar.value);
      const valor = value.replace(/[^\d,]/g, '');
      const valorReal = parseFloat(valor.replace(',', '.'));
      novoPedidoAlterar.deliveryDTO.fee = valorReal;
    }
    if (tipoPedidoSelect.value == 'RETIRADA') {
      novoPedidoAlterar.exitMethod = 'RETIRADA';
      novoPedidoAlterar.deliveryDTO = null;
    }

    console.log(novoPedidoAlterar);

    fetch(`http://localhost:8080/pedidos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(novoPedidoAlterar)
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
        limparPedidos();
        getPedidos();
      })
      .catch(error => {
        console.error("Erro:", error.message);
        if (error.message.includes("403")) {
          console.error("Erro 403: Acesso negado. Verifique suas permissões.");
        }
      });

    modalAlterarInfoPedido.style.display = "none";
    
}

btnAlterar.addEventListener("click", function(){
  atualizarPedido();
  document.getElementById('msg-erro-alterar').textContent = '';
  document.getElementById('msg-erro-entrega').textContent = '';
  tipoPedidoSelect.value = '';
});

const confirmarAlterarEntrega = document.getElementById('confirmar-entrega');

confirmarAlterarEntrega.addEventListener('click', () => {
  atualizarPedido();
  document.getElementById('msg-erro-alterar').textContent = '';
  document.getElementById('msg-erro-entrega').textContent = '';
  tipoPedidoSelect.value = '';
});

modalAlterarInfoPedido.addEventListener("click", function (event) {
  // if (event.target.textContent == 'Alterar') {
  //   novoPedidoAlterar.customerName = nomeAlterar.value;
  //   novoPedidoAlterar.orderStatus = andamentoAlterar.value;
  //   novoPedidoAlterar.paymentMethod = formaPagamentoAlterar.value;
  //   novoPedidoAlterar.exitMethod = tipoPedidoAlterar.value;

  //   if (tipoPedidoSelect.value == 'ENTREGA') {
  //     novoPedidoAlterar.exitMethod = 'ENTREGA';
  //     novoPedidoAlterar.deliveryDTO = {};
  //     novoPedidoAlterar.deliveryDTO.address = enderecoAlterar.value;
  //     novoPedidoAlterar.deliveryDTO.motoboy = motoboyAlterar.value;
  //     novoPedidoAlterar.deliveryDTO.change = trocoAlterar.value;
  //     novoPedidoAlterar.deliveryDTO.complement = complementoAlterar.value;
  //     novoPedidoAlterar.deliveryDTO.fee = taxaAlterar.value;
  //   }
  //   if (tipoPedidoSelect.value == 'RETIRADA') {
  //     novoPedidoAlterar.exitMethod = 'RETIRADA';
  //     novoPedidoAlterar.deliveryDTO = null;
  //   }

  //   console.log(novoPedidoAlterar);

  //   fetch(`http://localhost:8080/pedidos`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'PUT',
  //     body: JSON.stringify(novoPedidoAlterar)
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         // Lança um erro com o código de status para tratar respostas de erro
  //         throw new Error(`Erro HTTP! Status: ${response.status}`);
  //       }
  //       return response.json(); // Converte a resposta para JSON
  //     })
  //     .then(data => {
  //       console.log("Pedido atualizado com sucesso:", data);
  //       // window.location.reload(); // Descomente esta linha para recarregar a página, se necessário
  //     })
  //     .catch(error => {
  //       console.error("Erro:", error.message);
  //       if (error.message.includes("403")) {
  //         console.error("Erro 403: Acesso negado. Verifique suas permissões.");
  //       }
  //     });

  //   modalAlterarInfoPedido.style.display = "none";
  // }

var btnDelete = document.getElementById("deletar");
var btnConfirmar = document.getElementById("confirmarDelete");
var modalConfirmar = document.getElementById("confirmarCancel");
var btnCancelar = document.getElementById("cancelarDelete");

btnCancelar.addEventListener("click", function(){
  modalConfirmar.style.display = "none";
})

btnDelete.addEventListener("click", function(){
  modalConfirmar.style.display = "flex";
});

btnConfirmar.addEventListener("click", function(){
  const produtoId = novoPedidoAlterar.id;
    fetch(`http://localhost:8080/pedidos/${produtoId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
      .then(response => {
        console.log(response)
        window.location.reload()
      })
      .catch(erro => console.log(erro))
});

  // if (event.target.textContent == 'Confirmar') {
  //   const produtoId = novoPedidoAlterar.id;
  //   fetch(`http://localhost:8080/pedidos/${produtoId}`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'DELETE',
  //   })
  //     .then(response => {
  //       console.log(response)
  //       window.location.reload()
  //     })
  //     .catch(erro => console.log(erro))
  // }

  if (event.target.textContent == 'Fechar') {
    modalAlterarInfoPedido.style.display = "none";
    modalFecharPedido.style.display = "flex";
  }

  if (event.target.textContent == 'Cancelar') {
    pedidoAlterar = null;
    modalAlterarInfoPedido.style.display = "none";
    document.getElementById('msg-erro-alterar').textContent = '';
    document.getElementById('msg-erro-entrega').textContent = '';
    tipoPedidoSelect.value = '';
  }
})