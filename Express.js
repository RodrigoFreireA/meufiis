const app = express();
const port = 3000; // Defina a porta que deseja usar
const express = require('express');


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
app.get('/raspagem', async (req, res) => {
    try {
      const workbook = await xlsx.fromFileAsync('Pasta1.xlsx');
      const worksheet = workbook.sheet(0); // Seleciona a primeira planilha
  
      // Aqui você pode escrever a lógica para ler e manipular os dados da planilha
  
      res.send('Raspagem concluída com sucesso!');
    } catch (error) {
      console.error('Erro na raspagem:', error);
      res.status(500).send('Erro na raspagem de dados');
    }
  });
  