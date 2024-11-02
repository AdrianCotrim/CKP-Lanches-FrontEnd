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