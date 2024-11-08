const deliveryDTO = {
    motoboy: "",
    address: "",
    complement: null,
    change: "",
    fee: 0
};

const msgErroAlterarEntrega = document.getElementById('msg-erro-alterar');
const btnAlterarEntrega = document.getElementById('confirmar-alterar');

async function alterarEntrega(deliveryDTO, id_entrega) {
    
    try {
        const response = await fetch(`http://localhost:8080/entregas/${id_entrega}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(deliveryDTO)
        })

        if(!response.ok){
            const erro = await response.text();
            msgErroAlterarEntrega.style.display = 'block';
            msgErroAlterarEntrega.textContent = erro;
            throw new Error(erro);
        }

        const data = await response.json();

        console.log(data);

        window.location.reload();

    } catch (error) {
        console.log(error);
        msgErroAlterarEntrega.style.display = 'block';
        msgErroAlterarEntrega.textContent = error;
    }

}

btnAlterarEntrega.addEventListener('click', () => {

    const value = (taxa_alterar.value);
    const valor = value.replace(/[^\d,]/g, '');
    const valorReal = parseFloat(valor.replace(',', '.'));

    deliveryDTO.motoboy = motoboy_alterar.value;
    deliveryDTO.fee = valorReal;
    deliveryDTO.complement = complemento_alterar.value;
    deliveryDTO.change = troco_alterar.value;
    deliveryDTO.address = endereco_alterar.value;
    const id = document.getElementById('id-entrega-alterar').value;

    alterarEntrega(deliveryDTO, id);

    modalAlteraEntrega.style.display = 'none';

});