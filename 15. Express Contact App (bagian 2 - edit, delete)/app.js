const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
} = require("./utils/contact");

// express validator digunakan untuk memvalidasi
const { body, check, validationResult } = require("express-validator"); // express-validator

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const port = 3000;

// Konfigurasi flash message
app.use(cookieParser());
app.use(
  session({
    cookie: {
      maxAge: 6000,
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Set view engine 'ejs'
app.set("view engine", "ejs");

// Third-party middleware
// Menggunakan express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layouts/main-layouts"); // set agar ketika merender file hanya dari folder layouts/main-layouts.ejs

// Build-in middleware
// Express melindungi file-file static kita, untuk menggunakan file-file static kita perlu menggukana express.static("public", options)
// ecpress.static("folder_name", options) : digunakan untuk meload file-file static
app.use(express.static("public"));

// Build-in middleware
// express.ulrencode() : digunakan untuk memparsing data yang dikirim dari request body
// secara request body yang kita tangkap jika tidak menggunaakn 'express.urlencoded()' ialah undefined
app.use(express.urlencoded({ extended: true }));

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
app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    title: "Halaman Contact",
    contacts,

    // req.flash("nama_msg") : menangkap flash message yang dikirim di 'route poost contact'
    msg: req.flash("msg"),
  });
});

// halaman form tambah data contact
// kita harus menuliskan 'route form tambah data contact' ini diatas 'route detail contact', jika kita meniliskanya di bawah 'route detail contact' maka 'route form tambah data contact' tidak akan di jalankan
// ingat bahwa 'route detail contact' menerima request apapun setelah '/contact'
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
  });
});

// proses data contact
app.post(
  "/contact",
  [
    // custom validator (membuat validasi sendiri)
    body("nama").custom((value) => {
      // parameter 'value' berisi nama yang di ketikan di dalam form
      const duplikat = cekDuplikat(value); // memanggil fungsi cekDuplikat di dalam ulits/contact.js
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }

      return true;
    }),
    // cusstom error (membuat message errro sendiri)
    // check("email").isEmail().withMessage("Email tidak valid!"),
    // check("noHP").isMobilePhone("id-ID").withMessage("No HP tida valid!"),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // jika variable error tidak kosong
    if (!errors.isEmpty()) {
      // return res.status(404).json({ errors: errors.array() });

      // menampilkan pesan errors di halaman 'Form Tambah Data Contact'
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        errors: errors.array(),
      });
    } else {
      // req.body : digunakan untuk menangkap data yang dikirim lewat form
      // ketika kita menggunakan 'req.body' kita harus menggunakan middleware app.use(express.urlencoded())
      // console.log(req.body);
      // res.send(req.body);
      addContact(req.body);

      // kirim flash message
      req.flash("msg", `Data ${req.body.nama} berhasil ditambahkan`);

      // res.redirect() :  digunakan untuk melakukan redirect ke sebuah halaman
      // jika didalam method redirect kita menuliskan '/contact' artinya kita akan mengarah ke 'route get contact'
      res.redirect("/contact");
    }
  }
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  // cek apakah ada contact atau tidak
  const contact = findContact(req.params.nama);
  // jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>Not found!</h1>");
  } else {
    deleteContact(req.params.nama);

    // kirim flash message
    req.flash("msg", `Data ${req.params.nama} berhasil dihapus!`);

    // res.redirect() :  digunakan untuk melakukan redirect ke sebuah halaman
    // jika didalam method redirect kita menuliskan '/contact' artinya kita akan mengarah ke 'route get contact'
    res.redirect("/contact");
  }
});

// halaman form ubah data contact
// kita harus menuliskan 'route form ubah data contact' ini diatas 'route detail contact', jika kita meniliskanya di bawah 'route detail contact' maka 'route form ubah data contact' tidak akan di jalankan
// ingat bahwa 'route detail contact' menerima request apapun setelah '/contact'
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    contact,
  });
});

// proses update data contact
app.post(
  "/contact/update",
  [
    // custom validator (membuat validasi sendiri)
    // {req} : memungkinkan kita dapat mengambil 'parameter req(request)' walaupun validasinya berada sebelum parameter (req, res)
    body("nama").custom((value, { req }) => {
      // parameter 'value' berisi nama yang di ketikan di dalam form
      const duplikat = cekDuplikat(value); // memanggil fungsi cekDuplikat di dalam ulits/contact.js
      // jika namanya tidak sama dan duplikat
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }

      return true;
    }),
    // cusstom error (membuat message errro sendiri)
    // check("email").isEmail().withMessage("Email tidak valid!"),
    // check("noHP").isMobilePhone("id-ID").withMessage("No HP tida valid!"),
    check("email", "Email tidak valid!").isEmail(),
    check("noHP", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    // jika variable error tidak kosong
    if (!errors.isEmpty()) {
      // return res.status(404).json({ errors: errors.array() });

      // menampilkan pesan errors di halaman 'Form Ubah Data Contact'
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        errors: errors.array(),
        contact: req.body, // mengirimkan kembali data ke form edit-contact
      });
    } else {
      // req.body : digunakan untuk menangkap data yang dikirim lewat form
      // ketika kita menggunakan 'req.body' kita harus menggunakan middleware app.use(express.urlencoded())
      // console.log(req.body);
      // res.send(req.body);
      updateContact(req.body);
      // kirim flash message
      req.flash("msg", `Data ${req.body.nama} berhasil diubah`);
      // res.redirect() :  digunakan untuk melakukan redirect ke sebuah halaman
      // jika didalam method redirect kita menuliskan '/contact' artinya kita akan mengarah ke 'route get contact'
      res.redirect("/contact");
    }
  }
);

// halaman detail contact
app.get("/contact/:nama", (req, res) => {
  // req.params.nama : untuk mengambil parameter yang ada di url
  const contact = findContact(req.params.nama);
  res.render("detail", {
    title: "Halaman Detail Contact",
    contact,
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

app.use((req, res) => {
  res.status(404);
  res.send("Error : not found");
});

app.listen(port, () => {
  console.log(`Example application listening at http:localhost:${port}`);
});
