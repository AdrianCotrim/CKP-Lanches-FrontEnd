function toggleDropdown() {
  const dropdownContent = document.getElementById('dropdown-content');
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none';
  } else {
    dropdownContent.style.display = 'block';
  }
}

function deleteToken() {
  localStorage.removeItem("authToken");
  window.location.href = "/Tela-de-login/index.html"
}



window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');

  loadingScreen.style.display = 'none';
  mainContent.style.display = 'block';
});



document.addEventListener('DOMContentLoaded', () => {
  getName()
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


//FORMATAÇÕES

function formatCurrency(element) {
  // Remove tudo que não é dígito
  let value = element.value.replace(/\D/g, '');

  // Formata o valor como moeda
  if (value) {
      value = (parseInt(value) / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
      });
      element.value = value;
  } else {
      element.value = '';
  }
}

function formatTelefone(input) {
  input.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, ''); // Remove não dígitos

      if (value.length > 11) {
          value = value.slice(0, 11); // Limita a 11 dígitos
      }
      if (value.length > 6) {
          value = value.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3");
      } else if (value.length > 2) {
          value = value.replace(/(\d{2})(\d)/, "($1) $2");
      } else if (value.length > 0) {
          value = value.replace(/(\d+)/, "($1");
      }

      this.value = value; // Atualiza o campo com o valor formatado
  });
}

function formatCNPJ(input) {
  input.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, ''); // Remove não dígitos

      if (value.length > 14) {
          value = value.slice(0, 14); // Limita a 14 dígitos
      }
      if (value.length > 12) {
          value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5");
      } else if (value.length > 6) {
          value = value.replace(/(\d{2})(\d{3})(\d)/, "$1.$2.$3");
      } else if (value.length > 2) {
          value = value.replace(/(\d{2})(\d)/, "$1.$2");
      }

      this.value = value; // Atualiza o campo com o valor formatado
  });
}