// Modal
import  './adicionar-pedidos.js'

var modalFecharPedido = document.getElementById("fecharPedido");
let formaPagamento = document.getElementById("formaPagamento").value;

function fecharPedido() {
    console.log(pedido);
    /* etch("http://localhost:8080/pedidos", {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {
        
    })
    .catch(erro => console.log(erro));  */
}


modalFecharPedido.addEventListener("click", function(event) {
    if(event.target.textContent == 'Concluir'){
        fecharPedido();
        modalFecharPedido.style.display = "none"
    }
    if(event.target.textContent == 'Cancelar'){
        modalFecharPedido.style.display = "none"
    }
})