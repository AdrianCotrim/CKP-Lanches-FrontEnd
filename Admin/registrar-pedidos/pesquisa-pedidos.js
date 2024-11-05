const pedidos = document.getElementById("pedidos");
const pesquisaAndamento = document.getElementById("pesquisa-andamento");
const pesquisaNumero = document.getElementById("pesquisa-numero");

pesquisaAndamento.addEventListener("change", function(){
    console.log("andamento")
    const linhas = document.querySelectorAll(".linhaPedido")
    linhas.forEach((linha) => {
        let andamento_pedido = linha.querySelector("td:nth-child(1)").textContent
        if(!andamento_pedido.includes(pesquisaAndamento.value) && pesquisaAndamento.value != "todos") linha.style.display = "none";
        else linha.style.display = "table-row";
    })
})

pesquisaNumero.addEventListener("input", function(){
    const linhas = document.querySelectorAll(".linhaPedido");
    linhas.forEach((linha) => {
        let numero_pedido = linha.querySelector("td:nth-child(2)").textContent
        if(!numero_pedido.includes(pesquisaNumero.value)) linha.style.display = "none";
        else linha.style.display = "table-row";
    })
});