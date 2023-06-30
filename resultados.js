const xlsx = require('xlsx-populate');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views')); // Define o diretório de views
app.set('view engine', 'ejs'); // Define o template engine como EJS

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

async function realizarRaspagem() {
  try {
    const workbook = await xlsx.fromFileAsync('Pasta1.xlsx');
    const worksheet = workbook.sheet(0);

    const usedRange = worksheet.usedRange();
    const values = usedRange.value();

    let dadosColetados = [];

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      let rowData = [];
      for (let j = 1; j <= 4; j++) {
        const cell = row[j];
        const cellValue = cell || '';
        rowData.push(cellValue);
      }
      dadosColetados.push(rowData);
    }

    return dadosColetados;
  } catch (error) {
    console.error('Erro na raspagem:', error);
    return [];
  }
}

app.get('/resultados', async (req, res) => {
  const dadosColetados = await realizarRaspagem();
  const pagina = req.query.page || 1;
  const itensPorPagina = 10;
  const totalItens = dadosColetados.length;
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);
  const paginaAtual = Math.min(totalPaginas, Math.max(1, parseInt(pagina)));

  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const resultadosPaginados = dadosColetados.slice(inicio, fim);

  res.render('resultados', {
    dados: resultadosPaginados,
    paginaAtual: paginaAtual,
    totalPaginas: totalPaginas
  });
});

app.use(express.static(path.join(__dirname, 'public')));

setInterval(() => {
  realizarRaspagem();
}, 1 * 60 * 1000); // Executa a função realizarRaspagem a cada 2 minutos
