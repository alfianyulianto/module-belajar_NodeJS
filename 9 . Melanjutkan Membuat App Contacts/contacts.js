const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

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

const loadContact = () => {
  const file = fs.readFileSync(dataPath, "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp }; // membuat object
  // const file = fs.readFileSync(dataPath, "utf8");
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  // cek duplikat data
  // cek apakah sudah ada data nama yang sama di file 'contacts.json'
  const duplikat = contacts.find((contact) => {
    return contact.nama === nama;
  });
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!")
    );
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid"));
      return false;
    }
    // cek apakah sudah ada data email yang sama di file 'contacts.json'
    const duplikatEmail = contacts.find((contact) => {
      return contact.email === email;
    });
    if (duplikatEmail) {
      console.log(
        chalk.red.inverse.bold("Email sudah digunakan untuk contact lain!")
      );
      return false;
    }
  }

  // cek noHP
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomoer handphone tidak valid"));
    return false;
  }

  contacts.push(contact); // memasukan object contact ke dalam data/contacts.json

  fs.writeFileSync(dataPath, JSON.stringify(contacts)); // tulis kembali contacts ke dalam data/contatcs.json

  console.log(chalk.green.inverse.bold("Terimakasih sudah mengisikan data"));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.bgWhite.bold("Daftar contact : "));
  contacts.forEach((contact, index) => {
    console.log(` ${index + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((contact) => {
    return contact.nama.toLowerCase() === nama.toLowerCase();
  });

  // cek jika tidak ada nama contact yang ditemukan
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log();
  for (const c in contact) {
    console.log(`${c} : ${chalk.bold.inverse.yellow(contact[c])}`);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  // digunakan untuk memfilter dan hasilnya sebuah array
  const newContacts = contacts.filter((contact) => {
    return contact.nama.toLowerCase() !== nama.toLowerCase(); // filter yang mana namanya tidak ada di dalam contact
  });

  // cek jika tidak ada nama contact yang ditemukan
  if (contacts.length === newContacts.length) {
    // jika panjang array contacts dan newContacts sama berarti tidak ada data
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  // tulis kembail file 'contact.json
  fs.writeFileSync(dataPath, JSON.stringify(newContacts)); // tulis kembali contacts ke dalam data/contatcs.json

  console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
