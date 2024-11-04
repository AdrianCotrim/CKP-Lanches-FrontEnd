const divMsg = document.getElementById("msgErro");
const id = document.getElementById("id-retirar");
const quantidade = document.getElementById("quantidade-retirar");
const button = document.getElementById("confirmar-retirar");

const estoqueTbody = document.querySelector("#estoque tbody");

button.addEventListener('click', async () => {
    try{

        const movementCreateDTO = {
            quantity: parseInt(quantidade.value),
            supplyId: parseInt(id.value)
        }

        console.log(movementCreateDTO)


        const response = await fetch('http://localhost:8080/movimentacoes', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                method: 'POST',
                body: JSON.stringify(movementCreateDTO)
            });

        if(!response.ok) {
            const erro = await response.text();
            divMsg.innerHTML = `<span style="color: red; text-align: center" class="m-3">${erro}</span>`;
            throw new Error(erro)
        }

        const data = await response.json()
        

        estoqueTbody.innerHTML= "";
        getVerificarEstoque();

    } catch(error){
        console.log(error);
    }

});

