let btnAddMoviment = document.getElementById("abrirMovimentacao")
let btnCancelar = document.getElementById("cancelarMov")
let modalAddMoviment = document.getElementById("movimentacao")

btnAddMoviment.addEventListener("click", function(){
    modalAddMoviment.style.display = "flex";
});

btnCancelar.addEventListener("click", function(){
    modalAddMoviment.style.display = "none";
});