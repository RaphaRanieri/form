const express = require('express');
const path = require('path');
const app = express();

// Use a porta fornecida pelo ambiente de hospedagem ou 3000 como fallback.
const PORT = process.env.PORT || 3000; 

app.use(express.json());
// Assumindo que style.css e estatistica.css estão na pasta 'public'
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
    motivo2: { "Não": 0, Sim: 0, "Não tenho certeza": 0 },
    motivo3: { Sim: 0, "Não": 0, "Nunca aconteceu": 0 }
  }
};

// Rota para servir a página principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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
    // Acessa o valor do contador e incrementa, se a chave existir
    if (valor && contadores.perguntas[pergunta].hasOwnProperty(valor)) {
      contadores.perguntas[pergunta][valor]++;
    }
  });
  
  res.json({ mensagem: 'Estatísticas atualizadas com sucesso.' });
});

// 1. Rota para servir a página de estatísticas (estatistica.html)
app.get('/estatisticas', (req, res) => {
  res.sendFile(path.join(__dirname, 'estatistica.html'));
});

// 2. Rota para retornar os dados dos contadores (API)
app.get('/estatisticas/dados', (req, res) => {
  res.json(contadores);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});