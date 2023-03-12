const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// cek jika direktori data tidak ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// cek jika file contacts.json tidak ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// membuat sebuah promise untuk menangani callback hell
// callback hell artinya sebuah code yang selalu menjorok kedalam
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (result) => {
      resolve(result);
    });
  });
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp }; // membuat object
  const file = fs.readFileSync(dataPath, "utf8");
  const contacts = JSON.parse(file);
  contacts.push(contact); // memasukan object contact ke dalam data/contacts.json

  fs.writeFileSync(dataPath, JSON.stringify(contacts)); // tulis kembali contacts ke dalam data/contatcs.json
  rl.close();
};

module.exports = { tulisPertanyaan, simpanContact };
