const { MongoClient } = require("mongodb");
 const ObjectID = require("mongodb").ObjectId;

 const uri = "mongodb://127.0.0.1:27017";
 const dbName = "alfian";

 const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 });

 client.connect((error, result) => {
   if (error) console.log("Koneksi gagal!");

   // console.log("Koneksi berhasil!");

   // pilih database
   const db = client.db(dbName);

   // pilih collection
   const collection = db.collection("mahasiswa");

   // // Menambahkan satu data ke collection mahasiswa
   // // insertOne(param1, param2) : digunakan untuk insert satu data
   // // param1 : berisi data yang di inster
   // // param2 : berisi callback (err, success)
   // collection.insertOne(
   //   {
   //     nama: "Anjas Mara",
   //     email: "anjas.mara@gmail.com",
   //   },
   //   (error, result) => {
   //     if (error) {
   //       return console.log("gagal menambahkan data!");
   //     }
   //     console.log(result.ops);
   //   }
   // );

   // // Menambahkan lebih dari satu data
   // // insertMany : digunakan untuk insert lebih dari satu data
   // // param1 : berisi data yang di inster
   // // param2 : berisi callback (err, success)
   // collection.insertMany(
   //   [
   //     {
   //       nama: "Rama",
   //       email: "rama@gmail.com",
   //     },
   //     {
   //       nama: "Gilang Dirga",
   //       email: "gilangdirga@gmail.com",
   //     },
   //   ],
   //   (error, result) => {
   //     if (error) {
   //       return console.log("data gagal ditambahkan!");
   //     }
   //     console.log(result);
   //   }
   // );

   // // Menampilkan semua data yang ada di collection "mahasiswa"
   // // find() : digunakan untuk menampilkan data pada collection
   // // toArray() : digunakan untuk menampilkan sebuah data kedalam array
   // console.log(
   //   collection.find().toArray((error, result) => {
   //     console.log(result);
   //   })
   // );

   // Menampilkan data berdasarkan kriteria yang ada di collection "mahasiswa"
   // Jika kita menambahkan sebuah kriteria pada method find maka ini method find akan mencarri berdasarkan kriteria
   // console.log(
   //   collection
   //     .find({
   //       // menampilkan collection mahasiswa berdasarkan nama
   //       nama: "Budi",
   //     })
   //     .toArray((error, result) => {
   //       console.log(result);
   //     })
   // );

   // console.log(
   //   collection.find({ _id: new ObjectID("641c450dc7e9fd18b4fd3c6e") }) // menampilkan collection mahasiswa berdasarkan id
   //     .toArray((error, result) => {
   //      console.log(result);
   //     })
   // );

   //  //  Mengubah data
   //  //  updateOne(param1, param 2, option) : digunakan untuk mengupdat data
   //  //  param1: beriri kriteria atau filter data yang mau diupdate
   //  //  param2: digunakan untuk set data
   //  //  ketika kita menggunakan sebuah perintah di mongodb itu merupakan sebuah promise 
   //  const updatePromise = collection.updateOne(
   //    { _id: new ObjectID("641c462302d6c521343bf2d5") },
   //    { $set: { nama: "Rama Sulivan", email: "rama.sulvi@yahoo.com" } }
   //  );

   //  updatePromise
   //    .then((result) => {
   //      console.log(result);
   //    })
   //    .catch((error) => {
   //      console.log(error);
   //    });

   //  Mengubah data lebih dari satu berdasarkan kriteria
   //  collection.updateMany({ nama: "Budi" }, { $set: { nama: "Budi Aja" } });

   //  //  Menghapus satu data
   //  //  ketika kita menggunakan sebuah perintah di mongodb itu merupakan sebuah promise 
   //  collection
   //    .deleteOne({ _id: new ObjectID("641c462302d6c521343bf2d6") })
   //    .then((result) => {
   //      console.log(result);
   //    })
   //    .catch((error) => {
   //      console.log(error);
   //    });
   // ------------
   //  collection.deleteOne(
   //    { _id: new ObjectID("641c462302d6c521343bf2d5") },
   //    (error, result) => {
   //      console.log(result);
   //    }
   //  );

   //  Menghapus lebih dari satu data
   //  ketika kita menggunakan sebuah perintah di mongodb itu merupakan sebuah promise 
   collection
     .deleteMany({ nama: "Budi Aja" })
     .then((result) => {
       console.log(result);
     })
     .catch((error) => {
       console.log(error);
     });
 });