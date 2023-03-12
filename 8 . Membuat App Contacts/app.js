const { tulisPertanyaan, simpanContact } = require("./contacts.js");

// membuat function untuk memanggil promise
const main = async () => {
  const nama = await tulisPertanyaan("Masukan nama anda : ");
  const email = await tulisPertanyaan("Masukan email anda : ");
  const noHp = await tulisPertanyaan("Masukan nomer handphone anda : ");

  simpanContact(nama, email, noHp);
};

main();
