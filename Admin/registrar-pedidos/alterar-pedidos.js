// Modal
var modalAddPedido = document.getElementById("janelaRegisPedido")
const modalAlterarInfoPedido = document.getElementById("alterarInfoPedido")

// Exibe modal na tela
pedidos.addEventListener('click', (event) => {  
    if(event.target.nodeName == 'TD'){
        modalAlterarInfoPedido.style.display = 'flex'

        var pedido = event.target.parentNode
        let celulas = Array.from(pedido.children)

        var nome = "";
        // var id = celulas[1].textContent;
        var tipoPedido = celulas[3].textContent;
        var endereco = "";
          
        document.getElementById('nomeAlterar').value = nome;
        // document.getElementById('id').value = id;
        document.getElementById('tipoPedidoAlterar').value = tipoPedido;
        document.getElementById('enderecoAlterar').value = endereco;
    }

    if(event.target.nodeName == 'DIV'){
      modalAddPedido.style.display = 'flex'
    } 
})

modalAlterarInfoPedido.addEventListener("click", function(event) {
  if(event.target.textContent == 'Concluir'){
      modalAlterarInfoPedido.style.display = "none"
  }
  if(event.target.textContent == 'Cancelar'){
      modalAlterarInfoPedido.style.display = "none"
  }
})