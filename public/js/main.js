document.getElementById('formulario').addEventListener('submit', function(e){
    e.preventDefault(); // Evita envio real do formulário

    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        motivo1: document.querySelector('input[name="motivo1"]:checked')?.value,
        motivo2: document.querySelector('input[name="motivo2"]:checked')?.value,
        motivo3: document.querySelector('input[name="motivo3"]:checked')?.value
    };

    fetch('/contar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }).then(res => res.json())
      .then(() => window.location.href = 'estatisticas.html');
});