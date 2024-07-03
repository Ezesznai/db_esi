const express = require('express');
const cors = require('cors');

const app = express()
//const PORT = 8000

app.use(cors({
    origin: 'https://siaesi.vercel.app/api/data'
  }));
/*
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})
*/
console.log("server on port ${3000}")


const cards = [
  { id: 1, img: 'C:\Users\47653943\Desktop\backend\memotest\1' },
  { id: 2, img: 'C:\Users\47653943\Desktop\backend\memotest\2' },
  { id: 3, img: 'C:\Users\47653943\Desktop\backend\memotest\3' },
/*  { id: 4, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 5, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 6, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 7, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 8, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 9, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 10, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 11, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 12, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 13, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 14, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 15, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  */
  { id: 1, img: 'C:\Users\47653943\Desktop\backend\memotest\1' },
  { id: 2, img: 'C:\Users\47653943\Desktop\backend\memotest\2' },
  { id: 3, img: 'C:\Users\47653943\Desktop\backend\memotest\3' },
 /* { id: 4, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 5, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 6, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 7, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 8, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 9, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 10, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 11, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 12, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 13, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 14, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  { id: 15, img: 'C:\Users\47653943\Desktop\backend\memotest' },
  */
];

app.get('/', (req, res) => {
  res.json(cards);
});

app.listen(3000)
