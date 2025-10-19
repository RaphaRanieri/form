const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Contadores em memória
let contadores = {
    campos: {
        nome: 0,
        email: 0,
        telefone: 0,
        endereco: 0,
        data_nascimento: 0
    },
    perguntas: {
        motivo1: { Sempre: 0, "As vezes": 0, "Sou desatento": 0 },
        motivo2: { Não: 0, Sim: 0, "Não tenho certeza": 0 },
        motivo3: { Sim: 0, Não: 0, "Nunca aconteceu": 0 }
    }
};

// Atualiza contadores ao clicar no botão
app.post('/contar', (req, res) => {
    const dados = req.body;

    Object.keys(contadores.campos).forEach(campo => {
        if (dados[campo] && dados[campo].trim() !== '') {
            contadores.campos[campo]++;
        }
    });

    Object.keys(contadores.perguntas).forEach(pergunta => {
        const valor = dados[pergunta];
        if (valor && contadores.perguntas[pergunta][valor] !== undefined) {
            contadores.perguntas[pergunta][valor]++;
        }
    });

    res.json({ success: true });
});

// Rota para enviar contadores para a página de estatísticas
app.get('/estatisticas', (req, res) => {
    res.json(contadores);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});