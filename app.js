const xlsx = require('xlsx-populate');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

async function realizarRaspagem() {
  try {
    const workbook = await xlsx.fromFileAsync('Pasta1.xlsx');
    const worksheet = workbook.sheet(0);

    const usedRange = worksheet.usedRange();
    const values = usedRange.value();

    let htmlContent = `
      <html>
      <head>
        <title>Resultados da Raspagem</title>
      </head>
      <body>
        <h1>Resultados da Raspagem</h1>
        <table>
          <thead>
            <tr>
              <!-- Adicione mais cabeçalhos conforme necessário -->
            </tr>
          </thead>
          <tbody>
    `;

    values.forEach((row) => {
      htmlContent += "<tr>";
      row.forEach((cell) => {
        const cellValue = cell || ''; // Verifica se o valor da célula é nulo ou undefined e substitui por uma string vazia
        htmlContent += `<td>${cellValue}</td>`;
      });
      htmlContent += "</tr>";
    });

    htmlContent += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    const filePath = path.join(__dirname, 'resultados.html');
    fs.writeFileSync(filePath, htmlContent);

    console.log("Arquivo resultados.html salvo com sucesso!");
  } catch (error) {
    console.error('Erro na raspagem:', error);
  }
}

setInterval(() => {
  realizarRaspagem();
}, 2 * 60 * 1000); // Executa a função realizarRaspagem a cada 2 minutos

app.use(express.static(path.join(__dirname)));
