var modalAddLote = document.getElementById("addLote");
var btnAbrirAdd = document.getElementById("botaoAddLote");
let btnConcluir = document.getElementById("confirmar");
let btnFecharAdd = document.getElementById("botaoFecharAdd");
let LotDTO = {
    supplyId: 0,
    supplierId: 0,
    quantity: 0, 
    expirationDate: "",
    loteDate: "",
    value: 0
}

btnAbrirAdd.addEventListener("click", function () {
    modalAddLote.style.display = "flex"
    
    // Select insumos
    fetch("http://localhost:8080/insumos", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {
        const insumos = document.getElementById("insumos");
        dados.forEach(insumo => {
            let insumoOption = document.createElement("option");
            insumoOption.textContent = insumo.name;
            insumoOption.value = insumo.id;
            insumos.appendChild(insumoOption);
            
        })
    })
    .catch(erro => console.log(erro))

    // Select fornecedores
    fetch("http://localhost:8080/fornecedores", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(dados => {
        const fornecedores = document.getElementById("fornecedores");
        dados.forEach(fornecedor => {
            let fornecedorOption = document.createElement("option");
            fornecedorOption.textContent = fornecedor.name;
            fornecedorOption.value = fornecedor.id;
            fornecedores.appendChild(fornecedorOption);
        
        })
    })
    .catch(erro => console.log(erro))
    
});

btnFecharAdd.addEventListener("click", function () {
    modalAddLote.style.display = "none"
})

btnConcluir.addEventListener("click", function () {
    LotDTO.supplyId = parseInt(document.getElementById("insumos").value);
    LotDTO.supplierId = parseInt(document.getElementById("fornecedores").value);
    LotDTO.quantity = parseInt(document.getElementById("quantidade").value);
    LotDTO.expirationDate = document.getElementById("dataValidade").value + "T00:00:00";
    LotDTO.loteDate = document.getElementById("dataCompra").value + "T00:00:00";
    const value = document.getElementById("valor").value;
    const valor = value.replace(/[^\d,]/g, '');
    const valorReal = parseFloat(valor.replace(',', '.'));
    LotDTO.value = valorReal;
    console.log(LotDTO);

    fetch("http://localhost:8080/lots", {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        method: "POST",
        body: JSON.stringify(LotDTO)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`); 
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data); 
        //window.location.reload();
    })
    .catch(erro => console.log(erro));
    
    modalAddLote.style.display = "none";
    window.location.reload();
})