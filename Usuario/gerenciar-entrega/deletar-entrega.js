const botaoConfirmar = document.getElementById("confirmar");


botaoConfirmar.addEventListener("click", function () {
  const id_entrega = document.getElementById('id-entrega').value;
  fetch(`http://localhost:8080/entregas/${id_entrega}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  })
    .then(response => {
      console.log(response)
      //window.location.reload()
    })
    .catch(erro => console.log(erro))
});