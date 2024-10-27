// Modal
var modalFecharPedido = document.getElementById("fecharPedido");

console.log();
function fecharPedido(pedido) {
    let formaPagamento = document.getElementById("formaPagamento").value;
    const agora = new Date();
    const endDateTime = `${agora.getFullYear()}-${agora.getMonth()+1}-${agora.getDate()}T${agora.getHours()}:${agora.getMinutes()}`;
    const exitDateTime = `${agora.getFullYear()}-${agora.getMonth()+1}-${agora.getDate()}T${agora.getHours()}:${agora.getMinutes()}`;
    
    pedido.orderDTO.paymentMethod = formaPagamento;
    pedido.orderDTO.endDateTime = endDateTime;
    pedido.orderDTO.exitDateTime = exitDateTime;
    console.log(pedido);

    fetch("http://localhost:8080/pedidos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(pedido)
    })
    .then(response =>{
        console.log(response)
        window.location.reload()
    })
    .catch(erro => console.log(erro))

}


modalFecharPedido.addEventListener("click", function(event) {
    if(event.target.textContent == 'Concluir'){
        fecharPedido(pedido);
        modalFecharPedido.style.display = "none"
    }
    if(event.target.textContent == 'Cancelar'){
        modalFecharPedido.style.display = "none"
    }
})