const express = require('express');
const cors = require('cors');

const app = express()
const PORT = 8000

app.use(cors({
    origin: 'https://siaesi.vercel.app'
  }));

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})