const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// Mongoose
require("./utils/db");
const Contact = require("./models/contact");

// Flash message
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// Konfigurasi ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layouts");

// Konfigurasi flash message
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: {
      maxAge: 6000,
    },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Konfigurasi express
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Halaman home
app.get("/", (req, res) => {
  res.render("index", {
    title: "Halaman Home",
    nama: "Alfian Yulianto",
  });
});

// Halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
  });
});

// Halaman contact
app.get("/contact", async (req, res) => {
  // .find() : untuk menampilakan semua data contact
  // karena find masih berbentuk promise maka kita pakai async await
  const contacts = await Contact.find();
  // res.send(contacts);
  res.render("contact", {
    title: "Halaman Contact",
    contacts,

    // req.flash("nama_msg") : menangkap flash message yang dikirim di 'route poost contact'
    msg: req.flash("msg"),
  });
});

// Halanan contact detail
app.get("/contact/:nama", async (req, res) => {
  // req.params.nama : untuk mengambil parameter yang ada di url
  // .findOne({}) : untuk menampilkan satu anam contact berdasarka filter
  // {nama : <name>} : ini merupakan filter berdasrkan nama
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("detail", {
    title: "Halaman Detail Contact",
    contact,
  });
});

// Halaman mahasiswa
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
      nim: "L200180222",
      email: "indahlaras@gmail.com",
    },
  ];
  res.render("mahassiwa", {
    title: "Halaman Daftar Mahasiswa",
    mahasiswa,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | Listing at http://127.0.0.1:${port}`);
});
