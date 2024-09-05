document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector("#loginForm");
    const Inome = document.querySelector("#username");
    const Isenha = document.querySelector("#userPassword");

    async function logar() {
        try {
            // Faz a solicitação de login
            const response = await fetch("http://localhost:8080/auth/login", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    username: Inome.value,
                    userPassword: Isenha.value
                })
            });

            if (!response.ok) {
                throw new Error('Login falhou');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);

            // Imprime o token no console
            console.log('Token recebido:', data.token);

            // Obtém a role do usuário
            const userRole = await fetchUserRole();
            console.log('Role do usuário:', userRole);

            // Redireciona com base na role do usuário
            if (userRole === 'ADMIN') {
                window.location.href = "../homeAdminPage/inicio.html";
            } else if (userRole === 'USER') {
                window.location.href = "/homeUserPage/index.html";
            } else {
                window.location.href = "/login?error=roleNotFound"; // Caso a role não seja encontrada
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async function fetchUserRole() {
        const token = localStorage.getItem('authToken');
        console.log('Token usado para obter role:', token); // Imprime o token usado para obter a role

        try {
            const response = await fetch("http://localhost:8080/user/role", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter role do usuário');
            }

            const data = await response.json();
            console.log('Role recebida da API:', data.role); // Imprime a role recebida no console
            return data.role;
        } catch (error) {
            console.error('Erro ao obter role do usuário:', error);
            return null;
        }
    }

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        logar();
    });
});