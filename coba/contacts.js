const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// cek apakah file ./data/contacts.json exists atau tidak
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContacts = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// Manambah contact
const simpanContact = (nama, email, noHP) => {
  // validasi email, noHP
  const validasiEmail = validator.isEmail(email);
  const validasinoHP = validator.isMobilePhone(noHP, "id-ID");
  if (!validasiEmail) {
    console.log(chalk.red.inverse.bold(`Email yang dimasukan tidak valid!`));
    return false;
  }
  if (!validasinoHP) {
    console.log(
      chalk.red.inverse.bold(`Nomer handphone yang dimasukan tidak valid!`)
    );
    return false;
  }

  const contact = { nama, email, noHP };
  const contacts = loadContacts();

  // cek duplikat data contact
  const duplikatNama = contacts.find((contact) => {
    return contact.nama === nama;
  });
  if (duplikatNama) {
    const message = `${nama} sudah terdaftar di dalam contact, gunakan nama lain!`;
    console.log(chalk.red.inverse.bold(message));
    return false;
  }

  contacts.push(contact);
  // simpan data contacts
  fs.writeFileSync(dataPath, JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Terimakasih sudah mengisikan data."));
};

// Menampilkan semua daftar contact
const listContact = () => {
  const contacts = loadContacts();
  console.log(`${chalk.green.inverse.bold("Daftar contact : ")}`);
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

// Menampilkan detal contact berdasarkan nama
const detailContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => {
    return contact.nama.toLowerCase() === nama.toLowerCase();
  });

  // cek jika data nama contact tidak ada
  if (!contact) {
    console.log(
      chalk.red.inverse.bold(`${nama} tidak ditemuan di dalam contact!`)
    );
    return false;
  }

  for (const c in contact) {
    console.log(`${c} : ` + chalk.yellow.inverse.bold(`${contact[c]}`));
  }
};

// Menghapus nama berdasarkan contact
const deleteContact = (nama) => {
  const contacts = loadContacts();
  const newContacts = contacts.filter((contact) => {
    return contact.nama.toLowerCase() !== nama.toLowerCase();
  });

  // cek jika data nama contact tidak ada
  if (contacts.length === newContacts.length) {
    console.log(
      chalk.red.inverse.bold(`${nama} tidak ditemuan di dalam contact!`)
    );
    return false;
  }

  fs.writeFileSync(dataPath, JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold("Terimakasih sudah mengisikan data."));
};

module.exports = { simpanContact, detailContact, listContact, deleteContact };
