function buscarCEP() {
    let input = document.getElementById("cep").value;

    // Validação do CEP
    if (input.length !== 8 || isNaN(input)) {
        alert("Por favor, insira um CEP válido com 8 dígitos numéricos.");
        return;
    }

    const ajax = new XMLHttpRequest();  // Requisição AJAX
    ajax.open('GET', `https://viacep.com.br/ws/${input}/json/`, true);
    ajax.send();

    ajax.onload = function() {
        if (ajax.status === 200) {
            let obj = JSON.parse(ajax.responseText);

            // Verifica se o CEP retornou algum erro
            if (obj.erro) {
                alert("CEP não encontrado.");
                return;
            }

            // Preenche os campos com as informações
            document.getElementById('logradouro').innerText = obj.logradouro || 'Não disponível';
            document.getElementById('bairro').innerText = obj.bairro || 'Não disponível';
            document.getElementById('cidade').innerText = obj.localidade || 'Não disponível';
            document.getElementById('estado').innerText = obj.uf || 'Não disponível';
        } else {
            alert("Erro ao buscar CEP. Tente novamente mais tarde.");
        }
    };
}
