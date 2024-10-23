const token = localStorage.getItem('authToken');

fetch("http://localhost:8080/pedidos/finalizados", {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(dados => {
    console.log(dados)
    var vendas = document.getElementById("vendas")
    var tbody = vendas.querySelector("tbody")

    dados.forEach(element => {
        var tr = document.createElement("tr");
        const date = new Date();
        let dataHora = date.toLocaleString('pt-BR')

        tr.innerHTML = `<td>${element.orderId}</td>
        <td>${dataHora}</td>
        <td>${element.exitMethod}</td>
        <td>${element.paymentMethod}</td>
        <td>${element.totalValue == null ? "$00,00": element.totalValue}</td>`
        tr.classList.add("linha");
        tbody.appendChild(tr)
    });  
})
.catch(erro => console.log(erro))

