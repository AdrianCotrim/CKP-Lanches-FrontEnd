function formatTelefone(input) {
    input.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove não dígitos

        if (value.length > 11) {
            value = value.slice(0, 11); // Limita a 11 dígitos
        }
        if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3");
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d)/, "($1) $2");
        } else if (value.length > 0) {
            value = value.replace(/(\d+)/, "($1");
        }

        this.value = value; // Atualiza o campo com o valor formatado
    });
}

function formatCNPJ(input) {
    input.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove não dígitos

        if (value.length > 14) {
            value = value.slice(0, 14); // Limita a 14 dígitos
        }
        if (value.length > 12) {
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, "$1.$2.$3/$4-$5");
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{3})(\d)/, "$1.$2.$3");
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d)/, "$1.$2");
        }

        this.value = value; // Atualiza o campo com o valor formatado
    });
}

formatTelefone(document.getElementById('telefoneAltera'));
formatTelefone(document.getElementById('telefoneCadastro'));
formatCNPJ(document.getElementById('cnpjAltera'));
formatCNPJ(document.getElementById('cnpjCadastro'));