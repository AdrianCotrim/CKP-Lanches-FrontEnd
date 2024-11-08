const token = localStorage.getItem('authToken');
const pedidosArray = [];

var limparPedidos = () => {
  const pedidos = document.getElementById("pedidos")
  const tbody = pedidos.querySelector("tbody")
  tbody.innerHTML = '';
}

// Traz pedidos do banco
var getPedidos = () => {
  fetch("http://localhost:8080/pedidos", {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(dados => {
      console.log(dados)
      var pedidos = document.getElementById("pedidos")
      var tbody = pedidos.querySelector("tbody")

      dados.forEach(element => {
        pedidosArray.push(element);

        var tr = document.createElement("tr")
        tr.innerHTML = `<td>${element.orderStatus}</td>
          <td>${element.orderId}</td>
          <td>${element.customerName}</td>
          <td><div class="itens" onclick="abrirItens()">Itens</div></td>
          <td>${element.exitMethod}</td>
          <td>${element.paymentMethod}</td>
          <td>${element.totalValue == null ? "$00,00" : "$" + element.totalValue.toFixed(2)}</td>`
        tr.classList.add("linhaPedido");
        tbody.appendChild(tr)
      });

    })
    .catch(erro => console.log(erro))

}


document.addEventListener('DOMContentLoaded', () => {
  getName()
  getPedidos();
})

async function getName() {
  const usuarioLabel = document.getElementById('usuario');

  try {

    const response = await fetch("http://localhost:8080/user/name", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    usuarioLabel.textContent = data.username;

  } catch (erro) {
    console.error(erro);
  }
}






