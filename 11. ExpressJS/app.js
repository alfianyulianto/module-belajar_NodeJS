require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.ENV_PORT;
const hostname = process.env.ENV_HOSTNAME;

// app.get('/', (req, res)=> {}) : artinya ketika kita menjalankan aplikasinya dan kita mengarah ke 'root' jalankan callback
// ketika kita mencoba untuk masuk ke route yang tidak ada express akan 'meresponse dengan 404' (coba masuk ke http://127.0.0.1:3000/tidak)

// response : apa yang dikembalikan oleh express ketika mentarget path atau alamat url

// request : apa yang dikirimkan expressnya
// req.query() : digunakan untuk mengambil data setelah 'tanda ? di url' misal url (http://localhost:3000/about?nama=alfian)

// req.params : digunakan untuk menambil parameter yang dikirim di url (http://localhost:3000/product/100)
// app.get('/product/:id', (req, res)=> {
//    console.log(req.params.id)
// })

// jika use di atas route yang lain artinya request apapun yang ada di url akan ditangkap oleh method .use() dan route yang ada di bawah method .use() tidak akan dijalankan sebelum menuliskan fungsi middleware selanjutnya (next)
app.use((req, res) => {
  console.log(
    "Request kalian tidak akan diteruskan karena sudah ditangkap ole methode .use()"
  );
});

// mencoba response
app.get("/", (req, res) => {
  // res.send("Hello World!");

  // res.json() : digunakan untuk mengirimkan sebuah response json
  res.status(200).json({
    nama: "Alfian Yulianto",
    email: "alfian@gmail.com",
    noHP: "08127917219",
  });
});
app.get("/about", (req, res) => {
  // res.send("Ini adalah halaman about");

  // res.sendFile(relativePath, absoluePath, callback) : mengembalikan isi dari file
  res.sendFile("./about.html", { root: __dirname }, (err) => {
    if (err) throw err;
  });
});
app.get("/contact", (req, res) => {
  // res.send("Ini adalah halaman contact");

  // res.sendFile(relativePath, absoluePath, callback) : mengembalikan isi dari file
  res.sendFile("./contact.html", { root: __dirname }, (err) => {
    if (err) throw err;
  });
});

// mencoba request
// request params dan request query
app.get("/product/:id", (req, res) => {
  res.send(
    "Product ID : " + req.params.id + `<br> Category ${req.query.category}`
  );
});

// methode '.use()' digunakan untuk membuat 'middleware atau function'
// biasanya method ini digunakan untuk menangkap sebuah 'request dari url' yang isi requestnya apapun
// jika methode '.use()' digunakan di atas methode yang lain maka apapun request yang lain tidak akan dijalankan. ini terjadi karena methode '.use()' akan mengangkap 'request apapun dari url'
app.use("/", (req, res) => {
  // response .status() : digunakan untuk mengirimkan 'status code'
  res.status(404);
  res.send("<h1>404</h1>");
});

// method '.listen()' digunakan untuk bind dan menjalankan koneksi atau port
app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
