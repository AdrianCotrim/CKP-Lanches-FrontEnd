const botaoFinalizar = document.getElementById("botaoFinalizar");

botaoFinalizar.addEventListener("click", function(){
    const statusPedido = pedidoSelecionado.children[1];
    statusPedido.style.backgroundColor = "var(--verde)";
})
