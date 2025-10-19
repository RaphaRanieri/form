const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Contadores em memória (zerados a cada reinício do servidor)
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

// Atualiza contadores ao clicar no botão Enviar
app.post('/contar', (req, res) => {
  const dados = req.body;

  // Contar campos preenchidos
  Object.keys(contadores.campos).forEach(campo => {
    if (dados[campo] && dados[campo].trim() !== '') {
      contadores.campos[campo]++;
    }
  });

  // Contar respostas de perguntas
  Object.keys(contadores.perguntas).forEach(pergunta => {
    const valor = dados[pergunta];
    if (valor && contadores.perguntas[pergunta][valor] !== undefined) {
      contadores.perguntas[pergunta][valor]++;
    }
  });

  res.json({ success: true });
});

// Página de estatísticas visual
app.get('/estatisticas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'estatistica.html'));
});

// API JSON para dados
app.get('/estatisticas/dados', (req, res) => {
  res.json(contadores);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});