// Modal
var modalFecharPedido = document.getElementById("fecharPedido");

function fecharPedido(pedido) {
    let formaPagamento = document.getElementById("formaPagamento").value;
    const agora = new Date();
    let months = agora.getMonth()+1;
    let days = agora.getDate();
    let hours = agora.getHours();
    let minutes = agora.getMinutes();
    if(months<10) months = String(months).padStart(2, '0');
    if(days<10) days = String(days).padStart(2, '0');
    if(hours<10) hours = String(hours).padStart(2, '0');
    if(minutes<10) minutes = String(minutes).padStart(2, '0');
    const endDateTime = `${agora.getFullYear()}-${months}-${days}T${hours}:${minutes}`;
    const exitDateTime = `${agora.getFullYear()}-${months}-${days}T${hours}:${minutes}`;
    
    /* pedido.orderDTO.paymentMethod = formaPagamento;
    pedido.orderDTO.endDateTime = endDateTime;
    pedido.orderDTO.exitDateTime = exitDateTime; */
    if(pedido == novoPedidoAlterar){
        pedido.endDateTime = endDateTime;
        pedido.exitDateTime = exitDateTime;
        pedido.orderStatus = "FINALIZADO";
        pedido.paymentMethod = formaPagamento;
    }

    fetch("http://localhost:8080/pedidos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(pedido)
    })
    .then(response =>{
        console.log(response)
        ///window.location.reload()
    })
    .catch(erro => console.log(erro))

}


modalFecharPedido.addEventListener("click", function(event) {
    if(event.target.textContent == 'Concluir'){
        fecharPedido(novoPedidoAlterar);
        modalFecharPedido.style.display = "none"
    }
    if(event.target.textContent == 'Cancelar'){
        modalFecharPedido.style.display = "none"
    }
})