const modalAltLote = document.getElementById("alterarInfoPedido");
const lots = document.getElementById("lotes");
const btnCancelar = document.getElementById("cancelar");
const btnconcluir = document.getElementById("concluir");
let AltLotDTO = {
    supplyId: 0,
    supplierId: 0,
    quantity: 0, 
    expirationDate: "",
    loteDate: "",
    value: 0
}
let lotId = 0;

lotes.addEventListener("click", (event) => {
    if(event.target.nodeName == 'TD'){
        modalAltLote.style.display = "flex";
        const loteLinha = event.target.parentNode;
        
        // Pega lote a ser alterado
        fetch("http://localhost:8080/lots", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(dados => {
            dados.forEach(element => {
                if(element.id == parseInt(loteLinha.children[0].textContent)){
                    lotId = element.id;
                    document.getElementById("insumosAlterar").value = element.supplyTableDTO.id;
                    document.getElementById("fornecedoresAlterar").value = element.supplierTableDTO.id;
                    document.getElementById("quantidadeAlterar").value = element.quantity;
                    const dateTimeString = element.expirationDate;
                    const formattedDate = dateTimeString.split('T')[0];
                    const dateTimeCompraString = element.loteDate;
                    const formattedDateCompra = dateTimeCompraString.split('T')[0];
                    document.getElementById("dataValidadeAlterar").value = formattedDate;
                    document.getElementById("dataCompraAlterar").value = formattedDateCompra;
                    document.getElementById("valorAlterar").value = element.value;

                    AltLotDTO.supplyId = element.supplyTableDTO.id;
                    AltLotDTO.supplierId = element.supplierTableDTO.id;
                    AltLotDTO.quantity = element.quantity;
                    AltLotDTO.expirationDate = element.expirationDate;
                    AltLotDTO.loteDate = element.lotDate;
                    AltLotDTO.value = element.value;
                    console.log(AltLotDTO);

                }
            });  
        })
        .catch(erro => console.log(erro))

        // Select insumos
        fetch("http://localhost:8080/insumos", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(dados => {
            const insumos = document.getElementById("insumosAlterar");
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
            const fornecedores = document.getElementById("fornecedoresAlterar");
            dados.forEach(fornecedor => {
                let fornecedorOption = document.createElement("option");
                fornecedorOption.textContent = fornecedor.name;
                fornecedorOption.value = fornecedor.id;
                fornecedores.appendChild(fornecedorOption);
            
            })
        })
        .catch(erro => console.log(erro))
    }
})

btnCancelar.addEventListener("click", function(){
    modalAltLote.style.display = "none"
})

btnconcluir.addEventListener("click", (event) => {
    event.preventDefault();

    AltLotDTO.supplyId = parseInt(document.getElementById("insumosAlterar").value);
    AltLotDTO.supplierId = parseInt(document.getElementById("fornecedoresAlterar").value);
    AltLotDTO.quantity = parseInt(document.getElementById("quantidadeAlterar").value);
    AltLotDTO.expirationDate = document.getElementById("dataValidadeAlterar").value + "T00:00:00";
    AltLotDTO.loteDate = document.getElementById("dataCompraAlterar").value + "T00:00:00";
    const value = document.getElementById("valorAlterar").value;
    const valor = value.replace(/[^\d,]/g, '');
    const valorReal = parseFloat(valor.replace(',', '.'));
    AltLotDTO.value = valorReal;
    console.log(AltLotDTO);

    fetch(`http://localhost:8080/lots/${lotId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(AltLotDTO)
    })
    .then(response => {
        console.log(response.json())
        window.location.reload();
    })
    .catch(erro => {console.log(erro)})
    
    modalAltLote.style.display = "none"
})

//formatação monetária
const inputAlt = document.getElementById('valorAlterar');

inputAlt.addEventListener('input', function () {
    // Remove tudo que não é dígito
    let value = this.value.replace(/\D/g, '');

    // Formata o valor como moeda
    if (value) {
        value = (parseInt(value) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        this.value = value;
    } else {
        this.value = '';
    }
});