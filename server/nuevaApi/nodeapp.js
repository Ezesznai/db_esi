// nodeapp.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Esta es la API');
});

app.get('/api/data', (req, res) => {
  res.json('Hola del backend' );
});

app.listen(PORT, () => {
  console.log(`Server corriendo en el port: ${PORT}`);
});

