const botaoConfirmar = document.getElementById("confirmar");

botaoConfirmar.addEventListener("click", function(){
    entregasArray.forEach(entrega => {
        const nome = pedidoSelecionado.querySelector(".info-pedido").firstChild.textContent;
        if(entrega.customerName == nome){
            fetch(`http://localhost:8080/pedidos/${entrega.orderId}`, {
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
        }
        
    })
    
})