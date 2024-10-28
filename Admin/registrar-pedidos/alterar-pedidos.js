// Modal
var modalAddPedido = document.getElementById("janelaRegisPedido")
const modalAlterarInfoPedido = document.getElementById("alterarInfoPedido")
var pedidoAlterar = null;

// Exibe modal na tela
pedidos.addEventListener('click', (event) => {  
    if(event.target.nodeName == 'TD'){
        modalAlterarInfoPedido.style.display = 'flex'
        pedidoAlterar = event.target.parentNode;
        

        
        /* let celulas = Array.from(pedido.children)
        var nome = "";
        // var id = celulas[1].textContent;
        var tipoPedido = celulas[3].textContent;
        var endereco = "";
        document.getElementById('nomeAlterar').value = nome;
        // document.getElementById('id').value = id;
        document.getElementById('tipoPedidoAlterar').value = tipoPedido;
        document.getElementById('enderecoAlterar').value = endereco; */
    }

    if(event.target.nodeName == 'DIV'){
      modalAddPedido.style.display = 'flex'
    } 
})

modalAlterarInfoPedido.addEventListener("click", function(event) {
  if(event.target.textContent == 'Concluir'){
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
    modalAlterarInfoPedido.style.display = "none"
  }
})