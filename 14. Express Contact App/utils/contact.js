const fs = require("fs");

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

// Ambil semua data di data/contacts.json
const loadContact = () => {
  const file = fs.readFileSync(dataPath, "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

// Cari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => {
    return contact.nama.toLowerCase() === nama.toLowerCase();
  });
  return contact;
};

// Menuliskan / menimpa file contacts.json
const saveContact = (contacts) => {
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
};

// Menambahkan data contact baru
const addContact = (contact) => {
  // console.log(contact); // {nama: 'Vincentius David Widiyan', email: 'david@gmail.com',noHP: '081281'}
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts);
};

// Cek duplikat dari Contact
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
};

module.exports = { loadContact, findContact, addContact, cekDuplikat };
