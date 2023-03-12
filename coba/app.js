const yargs = require("yargs");
const {
  simpanContact,
  detailContact,
  listContact,
  deleteContact,
} = require("./contacts");

// .argv => untuk mengambil argument yang padasebuah object
// console.log(yargs.argv.nama);
// .strictOption() => digunakan agar ketika 'option' yang diberikan tidak sesuai dengan yang diminta akan muncul seperti '--help'
// .strictCommands => digunakan agar ketika 'command' yang diberikan tidak sesuai dengan yang diminta akan muncul seperti '--help'

// menambahkan sebuah data contact baru
yargs
  .command({
    command: "add",
    describe: "Menambahkan sebuah contact",
    builder: {
      nama: {
        alias: "n",
        describe: "Masukan nama",
        demandOption: true,
        type: "string",
      },
      email: {
        alias: "e",
        describe: "Email valid",
        demandOption: false,
        type: "string",
      },
      noHP: {
        alias: "p",
        describe: "Nomer handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      console.log(argv);
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand()
  .strictOptions()
  .strictCommands();

// Menampilkan semua datar contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua daftar contact",
  handler() {
    listContact();
  },
});

// menampilkan detail dari contact berdasarkan nama
yargs.command({
  command: "detail",
  describe: "Menampilkan data contact berdasarkan nama",
  builder: {
    nama: {
      alias: "n",
      describe: "Masukan nama",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact",
  builder: {
    nama: {
      alias: "n",
      describe: "Masukan nama",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
