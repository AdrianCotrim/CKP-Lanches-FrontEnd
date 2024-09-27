// Modal
var modalAddPedido = document.getElementById("janelaRegisPedido")

// Exibe modal na tela
pedidos.addEventListener('click', (event) => {  
    if(event.target.nodeName == 'TD'){
        console.log(event.target);
        modalAddPedido.style.display = 'flex'
  }   
})