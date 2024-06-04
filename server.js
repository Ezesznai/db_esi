const express = require("express")

const app = express()

app.get("/", (req, res) => res.send("Express on Vercel"));



app.listen(3000)

console.log("server on port ${3000}")

module.exports = app;



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


app.get('/cards', (req, res) => {
  res.json(cards);
});

