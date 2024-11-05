const botaoFinalizar = document.getElementById("botaoFinalizar");

botaoFinalizar.addEventListener("click", async function(){
    const statusPedido = pedidoSelecionado.children[1];
    statusPedido.style.backgroundColor = "var(--verde)";

    const id = document.getElementById('id-entrega').value;

    try{
        const response = await fetch(`http://localhost:8080/pedidos/${id}/orderstatus/finalizado`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if(!response.ok){
            const erro = await response.text();
            throw new Error(erro);
        }

        const data = await response.json();

        console.log(data);
    } catch (error){
        console.log(error);
    }
})
