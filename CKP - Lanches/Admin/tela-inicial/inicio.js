// script.js

document.addEventListener('DOMContentLoaded', () => {
  iniciar();
  valores();
})

async function valores() {
  const valorRecebido = document.getElementById("valor-recebido");
  const valorGasto = document.getElementById("valor-gasto");
  const valorGastoM = document.getElementById("valor-gasto-modal");
  const valorLucro = document.getElementById("valor-lucro");
  
  try {
    const response = await fetch("http://localhost:8080/tela-inicial/valores", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const valuesDTO = data.values || {};  // Garantir que valuesDTO não seja undefined
    const spents = valuesDTO.spents || [];  // Garantir que spents é um array
    const earned = valuesDTO.earned || [];  // Garantir que earned é um array
    const profit = valuesDTO.profit || 0;   // Garantir que profit é um número

    const valorR = formatNumber(earned.reduce((a, b) => a + b, 0).toFixed(2));
    const valorG = formatNumber(spents.reduce((a, b) => a + b, 0).toFixed(2));
    const valorL = formatNumber(profit.toFixed(2));
 
    // Atualiza elementos do DOM se necessário
    valorRecebido.textContent = `R$${valorR}`;
    valorGasto.textContent = `R$${valorG}`;
    valorLucro.textContent = `R$${valorL}`;
    valorGastoM.textContent = `R$${valorG}`;

    // GRÁFICO

    const valoresX = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const valorGastoY = [spents[0] || 0, spents[1] || 0, spents[2] || 0, spents[3] || 0, spents[4] || 0, spents[5] || 0, spents[6] || 0];
    const valorRecebidoY = [earned[0] || 0, earned[1] || 0, earned[2] || 0, earned[3] || 0, earned[4] || 0, earned[5] || 0, earned[6] || 0];

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

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


async function iniciar() {
  try {
    // Faz a solicitação de login
    const response = await fetch("http://localhost:8080/user/name", {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        },
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      window.location.href = "/Tela-de-login/index.html"
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Obtém a hora atual
    const agora = new Date();
    const hora = agora.getHours();

    // Determina a saudação usando operador ternário
    const saudacao = hora < 12 ? 'Bom dia' :
                    (hora < 18 ? 'Boa tarde' : 'Boa noite');

    // Obtém o nome do usuário da resposta
    const username = data.username; // Acessa o nome do usuário da resposta JSON

    // Cria a mensagem de boas-vindas
    const message = `${saudacao}, ${username}!`;

    // Atualiza o conteúdo do elemento com o ID "welcome"
    const welcome = document.getElementById("welcome");
    welcome.textContent = message;
  }
  catch (erro) {
    console.error('Erro:', erro);
  }
}

function formatNumber(value) {
  // Criar um NumberFormat para o locale brasileiro
  const numberFormat = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2, // Número mínimo de casas decimais
      maximumFractionDigits: 2  // Número máximo de casas decimais
  });

  // Formatar o número
  return numberFormat.format(value);
}

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

