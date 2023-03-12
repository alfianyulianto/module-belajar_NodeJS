const express = require("express");
const app = express();

const port = 3000;

// routing : mendeskripsikan bagaimana aplikasi melakukan response dari request client lewat endpoin
// structur routing pada Express.Js
// app.METHOD(path, handler)

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  // __dirname : digunakan untuk mengambil absolute root
  // console.log(__dirname);
  res.sendFile(__dirname + "/about.html");
});
app.get("/product/:id", (req, res) => {
  // req.params.<name> : digunakan untuk menangkap parameter yang dikirimkan di url
  // misal url http://127.0.0.1:3000/product/:id
  // parameter dari url diatas ialah ':id'
  res.send(`
    Product ID : ${req.params.id}
    Product ID : ${req.param("id")}
    Category : ${req.query.category}
    Path : ${req.path}
  `);
});

// method app.use() : digunakan untuk membuat middleware
app.use((req, res) => {
  res.status(404);
  res.send("Error : not found data");
});

app.listen(port, () => {
  console.log(`Server is listening in http://127.0.0.1:${port}`);
});
