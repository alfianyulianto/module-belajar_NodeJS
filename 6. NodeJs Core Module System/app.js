// core module
// File System : digunakan ketika kita menuliskan ke dalam directory kita atau membaca isi file dari directory kita

const fs = require("fs");
// console.log(fs);

// menuliskan string ke file (synchronouse)
// jika file belum ada maka akan dibuatkan tapi jika file sudah ada maka isinya akan ditimpa
// fs.writeFileSync("test.txt", "Hello World secara synchronouse!");
fs.writeFileSync("test.txt", "Hello World secara synchronouse!");

// ketika kita coba ingin membuat file pada sebuah folder yang mana nama folder tidak ada
// fs.writeFileSync("data/test.txt", "Hello World secara synchronouse!"); // error karena ada sendiri perintah untuk membuat folder

// // kita bisa menuliskan perintah kedalam block try catch
// try {
//   fs.writeFileSync("data/test.txt", "Hello World secara synchronouse!");
// } catch (e) {
//   console.log(e);
// }

// // menuliskan string ke file (asynchronouse)
// // ingat bahwan asynchronouse merupakan non-blocking sehingga kita bisa lanjut ke fungsi berikutnya sembari menunggu tulisan ini berhasil dituliskan
// fs.writeFile("test.txt", "Hello World secara asynchronouse!", (e) => {
//   console.log(e);
// });

// membaca isi file (synchronouse)
// const data = fs.readFileSync("test.txt");
// console.log(data); // yang tercetakhanyalah buffernya saja sehiangga kita harus rubah ke string
// console.log(data.toString()); // Hello World secara synchronouse!

// menambahkan option pada method
// const data = fs.readFileSync("test.txt", "utf-8");
// console.log(data); // Hello World secara synchronouse!

// membaca isi file (asynchronouse)
// fs.readFile("test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// readline
// untuk membaca apa yang kita tulis di terminalnya
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// // satu pertanyaan
// rl.question("Masukan nama anda : ", (answer) => {
//   console.log(`Hallo ${answer}, selamat datang di website kami!`);

//   rl.close();
// });

// // dua pertanyaan
// rl.question("Masukan nama anda : ", (nama) => {
//   // console.log(`Hallo ${nama}, selamat datang di website kami!`);
//   rl.question("Masukan nomer handphone and : ", (hp) => {
//     console.log(`Hallo ${nama}, selamat datang di website kami! Nomer handphone anda ${hp}`);
//     rl.close();
//   });
// });

// Latihan membuat pertanyaan dan menulis hasil pertanyaan ke file json
// rl.question("Masukan nama anda : ", (nama) => {
//   rl.question("Masukan nomer handphone : ", (hp) => {
//     const contact = { nama, hp }; // membuat object
//     const file = fs.readFileSync("contacts.json", "utf8");
//     const contacts = JSON.parse(file); // merubah isi dari contacts menjadi json
//     contacts.push(contact); // masukan object contact ke ile contacts.json
//     console.log(contacts);

//     fs.writeFileSync("contacts.json", JSON.stringify(contacts)); // menuliskan ke file contacts
//     console.log("Terimakasih sudah memasukan data anda!");

//     rl.close();
//   });
// });

// Latihan membuat pertanyaan dan menulis hasil pertanyaan ke file json (dengan asynchronouse)
rl.question("Masukan nama anda : ", (nama) => {
  rl.question("Masukan nomer ponsel : ", (hp) => {
    const contact = { nama, hp };
    // cek apakah file contacts.json exists
    if (!fs.existsSync("./contacts.json")) {
      fs.writeFile("./contacts.json", JSON.stringify([contact]), (err) => {
        if (err) throw err;
      });
    } else {
      fs.readFile("./contacts.json", "utf-8", (err, data) => {
        if (err) throw err;
        const contacts = JSON.parse(data);
        contacts.push(contact);

        fs.writeFile("./contacts.json", JSON.stringify(contacts), (err) => {
          if (err) throw err;
        });
        console.log("Terimakasih sudah memasukan data anda!");
        console.log(contacts);
      });
    }

    rl.close();
  });
});
