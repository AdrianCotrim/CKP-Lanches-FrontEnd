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
