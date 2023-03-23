const express = require("express");
const expressLayouts = require("express-ejs-layouts"); // memanggil package 'express-ejs-layouts'
const app = express();

const port = 3000;

// menggunakan tamplating engine EJS
// app.set(name, value)
// ketike kita sudah melakukan set express untuk view engine maka express akan mendeteksi ada tidak halaman viewnya di foder views
// ketika kita menggunakan view engin maka extensi file harus di ubah sesua dengan view enginenya, misal jika ejs maka extensi file viewsnya harus '.ejs'
app.set("view engine", "ejs");

// kita bisa menggunakan layouts tanpa harus menuliskan
app.set("layout", "layouts/main-layout");
app.use(expressLayouts); // meggunakan express-ejs-layouts

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });

  // res.render() : digunakan untuk memanggil halaman di folder views
  // res.render() sudah relative terhadap folder views
  // res.render(name_file, data)
  // parameter nama_file : nama file dengan extensi .ejs
  // parameter data : berbentuk object
  res.render("index", {
    // properti 'layout' : untuk memberitahun bahwa kita mau menggunakan layout mana (relative terhadap folder layout)
    // kita bisa mengset default layout dengan perintah app.set('layout', 'layouts/main-layout')
    // layout: "layouts/main-layout",
    title: "Express Tamplate Engine",
    nama: "Alfian Yulianto",
  });
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
      nim: "L200180221",
      email: "budi.doremi@gmail.com",
    },
    {
      nama: "Indah Larasati",
      nim: "L200180111",
      email: "indahlaras@gmail.com",
    },
  ];
  res.render("mahasiswa", {
    title: "Daftar Mahasiwa",
    mahasiswa,
  });
});
app.get("/about", (req, res) => {
  // res.sendFile("./about.html", { root: __dirname });

  res.render("about", {
    // properti 'layout' : untuk memberitahun bahwa kita mau menggunakan layout mana (relative terhadap folder layout)
    // kita bisa mengset default layout dengan perintah app.set('layout', 'layouts/main-layout')
    // layout: "layouts/main-layout",
    title: "Halaman About",
  });
});
app.get("/contact", (req, res) => {
  // res.sendFile("./contact.html", { root: __dirname });
  res.render("contact", {
    // properti 'layout' : untuk memberitahun bahwa kita mau menggunakan layout mana (relative terhadap folder layout)
    // layout: "layouts/main-layout",
    // kita bisa mengset default layout dengan perintah app.set('layout', 'layouts/main-layout')
    title: "Halaman Contact",
  });
});
app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category : ${req.query.category}`
  );
});
app.get("/coba", (req, res) => {
  res.render("coba", {
    // layout: "layout/main-layout",
    title: "Halaman Coba",
  });
});

// app.use() : biasanya digunakan untuk middleware
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Error: file not found</h1>");
});

// app.listen() : digunakan untuk bind dan menjalanakan koneksi atau port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
