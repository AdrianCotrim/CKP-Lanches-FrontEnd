// script.js

// Obtém o modal
var modal = document.getElementById("alteraValor");

// Obtém o botão que abre o modal
var btn = document.getElementById("abrirAlteraValor");

// Obtém o elemento <span> que fecha o modal
var span = document.getElementsByClassName("botao--vermelho")[0];

// Quando o usuário clicar no botão, abre o modal
btn.onclick = function() {
    modal.style.display = "flex";
}

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}


// GRÁFICO

const valoresX = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const valorGastoY = [50, 10, 150, 200, 250, 300, 350];  // Valores para barras vermelhas
const valorRecebidoY = [30, 80, 120, 180, 230, 270, 320]; // Valores para barras verdes

new Chart("myChart", {
  type: "bar",
  data: {
    labels: valoresX,
    datasets: [
      {
        label: "Valor gasto",
        data: valorGastoY,
        backgroundColor: "#CE2323",
        barThickness: 35
      },
      {
        label: "Valor recebido",
        data: valorRecebidoY,
        backgroundColor: "#30B035",
        barThickness: 35
      }
    ]
  },
});