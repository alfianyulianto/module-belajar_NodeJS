const mongoose = require("mongoose");

// Membuat schema
// mongoose.model(param1, param2) : digunakan untuk membuat collection, ingat bahwa mongoose itu menganggap bahwa satu collection sebagai sebuah model
// param1 : berisi nama model yang mana mongoose akan membuat namanya menjadi plural
// param2 : merupakan object yang disi dengan field-field yang akan di simpan kedalam model / colection
const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    required: true,
  },
  nohp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

module.exports = Contact;
