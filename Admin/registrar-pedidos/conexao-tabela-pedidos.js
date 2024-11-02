const token = localStorage.getItem('authToken');
const pedidosArray = [];

document.addEventListener('DOMContentLoaded', () => {
    getName()
  })
  
  async function getName() {
    const usuarioLabel = document.getElementById('usuario');
  
    try{
  
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
  
    } catch(erro){
      console.error(erro);
    }
  }

// Traz pedidos do banco
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
        <td><div class="itens">Itens</div></td>
        <td>${element.exitMethod}</td>
        <td>${element.paymentMethod}</td>
        <td>${element.totalValue == null ? "$00,00": "$" + element.totalValue}</td>`
        tr.classList.add("linha");
        tbody.appendChild(tr)
    });
      
})
.catch(erro => console.log(erro))

