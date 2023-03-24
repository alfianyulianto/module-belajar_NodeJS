//  Untuk koneksi ke database
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/alfian", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// // Membuat schema
// // mongoose.model(param1, param2) : digunakan untuk membuat collection, ingat bahwa mongoose itu menganggap bahwa satu collection sebagai sebuah model
// // param1 : berisi nama model yang mana mongoose akan membuat namanya menjadi plural
// // param2 : merupakan object yang disi dengan field-field yang akan di simpan kedalam model / colection
// const Contact = mongoose.model("Contact", {
//   nama: {
//     type: String,
//     required: true,
//   },
//   nohp: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
// });

// // Menambah satu data
// const contact1 = new Contact({
//   nama: "Alfian Yulianto",
//   nohp: "081217432366",
//   email: "alfianyulianto36@gmail.com",
// });
// const contact2 = new Contact({
//   nama: "Budi Doremi",
//   nohp: "081765789888",
//   email: "budi.doremi@gmail.com",
// });

// // Simpan ke collection
// contact1.save().then((result) => {
//   console.log(result);
//   /*Output :
//   {
//     _id: 641d1395c68c4b09f4324800,
//     nama: 'Alfian Yulianto',
//     nohp: '081217432366',
//     email: 'alfianyulianto36@gmail.com',
//     __v: 0
// }
//   */
// });
// contact2.save().then((result) => {
//   console.log(result);
//   /*Output :
//   {
//     _id: 641d14251f5e6809846e2d2c,
//     nama: 'Budi Doremi',
//     nohp: '081765789888',
//     email: 'budi.doremi@gmail.com',
//     __v: 0
//   }
//   */
// });
