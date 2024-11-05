// Modal
var btnAdd = document.getElementById("registrarPedido");
var modalInfoPedido = document.getElementById("infoPedido");
var modalAddProd = document.getElementById("addProdutos");
var modalFecharPedido = document.getElementById("fecharPedido");
const pedido = {
    orderDTO: {
        orderStatus: "PREPARANDO",
        customerName: "",
        exitMethod: "",
        paymentMethod: "",
        endDateTime: "",
        exitDateTime: "",
        orderProductDTOs: []
    },
    deliveryDTO: {
        motoboy: "",
        address: "",
        complement: null,
        change: "",
        fee: 0,
        telefone: "(19) 91234-5678"
    }
};


async function adicionaPedido(pedido) {
    try {
        const response = await fetch("http://localhost:8080/pedidos", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (erro) {
        console.log(erro);
    }
}


// Exibe modal na tela
btnAdd.addEventListener("click", function () {
    modalInfoPedido.style.display = "flex"
});

// Habilita campos de "entrega"
const entrega = document.getElementById('entrega');
const tipoPedido = document.getElementById('tipoPedido');
tipoPedido.addEventListener('change', function () {
    if (this.value === 'ENTREGA') {
        entrega.style.display = ""
    } else {
        entrega.style.display = "none"
    }
});

modalInfoPedido.addEventListener("click", function (event) {
    // Coleta dados do modal
    var nomeCliente = document.getElementById("nomeCliente").value;
    var tipoPedido = document.getElementById("tipoPedido").value;
    var motoboyNome = document.getElementById("motoboy").value;
    var endereco = document.getElementById("endereco").value;
    var complemento = document.getElementById("complemento").value;
    var troco = document.getElementById("troco").value;
    var taxa = document.getElementById("taxa").value;


    if (event.target.textContent == 'Concluir' && tipoPedido != "") {
        pedido.orderDTO.customerName = nomeCliente;
        pedido.orderDTO.exitMethod = tipoPedido;

        if (tipoPedido == "RETIRADA") {
            pedido.deliveryDTO = null;
            console.log(pedido);

            // Reseta os valores do modal
            nomeCliente.value = "";
            tipoPedido.value = "";
            endereco.value = "";
            motoboyNome.value = "";
            troco.value = "";
            complemento.value = "";
            taxa.value = "";

            modalInfoPedido.style.display = "none";
            modalAddProd.style.display = "flex";
        }

        if (tipoPedido == "ENTREGA") {
            pedido.deliveryDTO.motoboy = motoboyNome;
            pedido.deliveryDTO.address = endereco;
            pedido.deliveryDTO.complement = complemento == "" ? null : complemento;
            pedido.deliveryDTO.change = troco;
            const valor = taxa.replace(/[^\d,]/g, '');
            const valorReal = parseFloat(valor.replace(',', '.'));
            pedido.deliveryDTO.fee = valorReal;
            console.log(pedido);

            // Reseta os valores do modal
            nomeCliente.value = "";
            tipoPedido.value = "";
            endereco.value = "";
            motoboyNome.value = "";
            troco.value = "";
            complemento.value = "";
            taxa.value = "";

            modalInfoPedido.style.display = "none";
            modalAddProd.style.display = "flex";
        }
    }

    var btnCancelar = document.getElementById("cancelar");
    var inputNomeCliente = document.getElementById("nomeCliente")

    btnCancelar.addEventListener("click", function () {
        inputNomeCliente.value = "";
        // Reseta os valores do modal
        nomeCliente.value = "";
        tipoPedido.value = "";
        endereco.value = "";
        motoboyNome.value = "";
        troco.value = "";
        complemento.value = "";
        taxa.value = "";
        modalInfoPedido.style.display = "none";
    })
})