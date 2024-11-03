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