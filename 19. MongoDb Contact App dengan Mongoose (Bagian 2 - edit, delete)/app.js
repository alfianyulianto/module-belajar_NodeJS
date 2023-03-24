const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// Mongoose
require("./utils/db");
const Contact = require("./models/contact");

// Express validator
const { body, check, validationResult } = require("express-validator");

// Method override
const methodOverride = require("method-override");

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

// Konfigurasi method-override
app.use(methodOverride("_method"));

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

// Halaman form tambah data contact
// kita harus menuliskan 'route form tambah data contact' ini diatas 'route detail contact', jika kita meniliskanya di bawah 'route detail contact' maka 'route form tambah data contact' tidak akan di jalankan
// ingat bahwa 'route detail contact' menerima request apapun setelah '/contact'
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
  });
});

// Proses tambah data contact
app.post(
  "/contact",
  [
    // custom validator (membuat validasi sendiri)
    body("nama").custom(async (value) => {
      // parameter 'value' berisi nama yang di ketikan di dalam form
      // .findOne({}) : untuk menampilkan satu anam contact berdasarka filter
      // {nama : <name>} : ini merupakan filter berdasrkan nama
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }

      return true;
    }),
    // cusstom error (membuat message errro sendiri)
    // check("email").isEmail().withMessage("Email tidak valid!"),
    // check("noHP").isMobilePhone("id-ID").withMessage("No HP tida valid!"),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "No hp tidak valid!").isMobilePhone("id-ID"),
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
      // .insertMany(param1, param2) : untuk menambah data ke dalam collection
      // param1 : berisi data yang ingin ditambahkan
      // param2 : berbentuk callback yang dapat menangkap error dan result
      Contact.insertMany(req.body, (error, result) => {
        // kirim flash message
        req.flash("msg", `Data ${req.body.nama} berhasil ditambahkan`);

        // res.redirect() :  digunakan untuk melakukan redirect ke sebuah halaman
        // jika didalam method redirect kita menuliskan '/contact' artinya kita akan mengarah ke 'route get contact'
        res.redirect("/contact");
      });
    }
  }
);

// // Proses delete data contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   // cek apakah ada contact atau tidak
//   // .findOne({}) : untuk menampilkan satu anam contact berdasarka filter
//   // {nama : <name>} : ini merupakan filter berdasrkan nama
//   const contact = await Contact.findOne({ nama: req.params.nama });
//   // jika contact tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>Not found!</h1>");
//   } else {
//     // .deleteOne(param1, param2) : untuk menghapus satu data dari collection
//     // param1 : untuk menentukan kriteria berdasarkan apa kita hapus
//     // param2 : berbentuk callback yang dapat menangkap error dan result
//     Contact.deleteOne(
//       { _id: contact._id }, // hapus contact berdasarkan id contact yang berhasil kita di variable contact diatas
//       (error, result) => {
//         // kirim flash message
//         req.flash("msg", `Data ${req.params.nama} berhasil dihapus!`);

//         // res.redirect() :  digunakan untuk melakukan redirect ke sebuah halaman
//         // jika didalam method redirect kita menuliskan '/contact' artinya kita akan mengarah ke 'route get contact'
//         res.redirect("/contact");
//       }
//     );
//   }
// });

// Proses delete data contact dengan package method-override
app.delete("/contact", (req, res) => {
  // res.send(req.body);
  // .deleteOne(param1, param2) : untuk menghapus satu data dari collection
  // param1 : untuk menentukan kriteria berdasarkan apa kita hapus
  // param2 : berbentuk callback yang dapat menangkap error dan result
  Contact.deleteOne(
    { nama: req.body.nama }, // hapus contact berdasarkan nama
    (error, result) => {
      // kirim flash message
      req.flash("msg", `Data ${req.body.nama} berhasil dihapus!`);

      // res.redirect() :  digunakan untuk melakukan redirect ke sebuah halaman
      // jika didalam method redirect kita menuliskan '/contact' artinya kita akan mengarah ke 'route get contact'
      res.redirect("/contact");
    }
  );
});

// Halaman form ubah data contact
// kita harus menuliskan 'route form ubah data contact' ini diatas 'route detail contact', jika kita meniliskanya di bawah 'route detail contact' maka 'route form ubah data contact' tidak akan di jalankan
// ingat bahwa 'route detail contact' menerima request apapun setelah '/contact'
app.get("/contact/edit/:nama", async (req, res) => {
  // .findOne({}) : untuk menampilkan satu anam contact berdasarkan filter
  // {nama : <name>} : ini merupakan filter berdasrkan nama
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    contact,
  });
});

// Proses update data contact
app.put(
  "/contact",
  [
    // custom validator (membuat validasi sendiri)
    // {req} : memungkinkan kita dapat mengambil 'parameter req(request)' walaupun validasinya berada sebelum parameter (req, res)
    body("nama").custom(async (value, { req }) => {
      // parameter 'value' berisi nama yang di ketikan di dalam form
      // .findOne({}) : untuk menampilkan satu anam contact berdasarka filter
      // {nama : <name>} : ini merupakan filter berdasrkan nama
      const duplikat = await Contact.findOne({ nama: value });
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
    check("nohp", "No hp tidak valid!").isMobilePhone("id-ID"),
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
      // .updateOne(param1, param2) : untuk menguodate satu data dari collection
      // param1 : untuk menentukan kriteria berdasarkan apa kita hapus
      // param2 : berbentuk callback yang dapat menangkap error dan result
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // kirim flash message
        req.flash("msg", `Data ${req.body.nama} berhasil diubah`);
        // res.redirect() :  digunakan untuk melakukan redirect ke sebuah halaman
        // jika didalam method redirect kita menuliskan '/contact' artinya kita akan mengarah ke 'route get contact'
        res.redirect("/contact");
      });
    }
  }
);

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
