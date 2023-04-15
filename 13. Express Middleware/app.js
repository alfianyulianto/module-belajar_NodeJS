const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const morgan = require("morgan");

const port = 3000;

// menggunakan tamplate engine ejs
app.set("view engine", "ejs");

// Third-party middleware
// menggunakan express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layouts/main-layouts"); // meberikan nilai default layout utama
app.use(morgan("dev"));

// Built-in middleware
app.use(express.static("public"));
app.use(express.json());

// Application level middleware
app.use((req, res, next) => {
  // ketika kita tidak menuliskan route di metode app.use() artinya use akan menangkap sebua url yang dituliskan
  console.log(" Ini middleware ke-1");

  // next() digunakan untuk berpidah ke middleware berikutnya
  // artinya middleware berikutnya yaitu tergantung dari url yang ditulus di browser
  // misal jika kita menulit "/about" maka setelah menelwati middleware ini akan langsung ke 'route /about'
  // jika kita tidak menuliskan 'next()' maka akan menjadi 'hanging(ngehang)'
  next();
});

// .get() : bisa ditambahkan fungsi middleware berikutnya(next)
// app.get("/middleware", (req, res, next)=> {})
app.get("/", (req, res) => {
  res.render("index", {
    title: "Halaman Home",
    nama: "Alfian Yulianto",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
  });
});

// Appliaction level middleware
app.use((rq, res, next) => {
  console.log("Ini middleware ke-2");
  // console.log diatas akan ditampilkan ketika kita menuju ke halaman contact, maasiswa, product, dan coba
  // halaman root dan halaman about tidak akan tampil console.log diatas
  next();
});

app.get("/contact", (req, res, next) => {
  // res.render("contact", {
  //   title: "Halaman Contact",
  // });
  console.log("Ini adalah halaman contact");

  // jika kita menambah 'next()' disini maka akan menjalankan middleware berikutnya
  // artinya ini tidak akan menjalankan 'route /mahasiswa', 'route /product', atau 'route /coba'
  // ini akan mencari method app.use()
  next();
});

app.get("/mahasiswa", (req, res) => {
  const mahasiswa = [
    {
      nama: "Alfian Yulianto",
      nim: "L200180121",
      email: "alfianyulianto36@gmail.com",
    },
    {
      nama: "Budi Doremi",
      nim: "L200180111",
      email: "budi.doremi@gmail.com",
    },
    {
      nama: "Indah Larasati",
      nim: "L2001802",
      email: "indahlaras@gmail.com",
    },
  ];
  res.render("mahasiswa", {
    title: "Halaman Daftar Mahasiswa",
    mahasiswa,
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category : ${req.query.category}`
  );
});

app.get("/coba", (req, res) => {
  res.render("coba", {
    title: "Halaman Coba",
  });
});

// biasanya digunakan untuk middleware
app.use((req, res) => {
  res.status(404);
  res.send("<h1>Error :  not found</h1>");
});

app.listen(port, () => {
  console.log(`Example is listening at http://localhost:${port}`);
});
