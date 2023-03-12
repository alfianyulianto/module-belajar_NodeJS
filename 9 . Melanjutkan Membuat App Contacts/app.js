// mengambil argument dari command line
// console.log(process.argv); // fungsi untuk mengambil argument langsung dari 'nodeJS'

// dengan perintah 'node app alfian'
// console.log(process.argv[2]); // alfian

// menggunakan 'package yargs'
const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

// // dengan perintah 'node app add --nama="Alfian"
// .argv =>untuk mengambil argument yang pada sebuah object
// console.log(yargs.argv); // { _: [ 'add' ], nama: 'Alfian', '$0': 'app' }
// console.log(yargs.argv.nama); // Alfian

// // dengan perintah 'node app add --nama="ALfian"'
// yargs.command(
//   "add",
//   "Menambahkan contact baru",
//   () => {}, // builder untuk menampung parameter
//   (argv) => { // handler untuk mengeksekusi jika ada (menampilkan hasil)
//     console.log(argv.nama); // Alfian
//   }
// );

// .argv => untuk mengambil argument yang padasebuah object
// console.log(yargs.argv.nama);
// .strictOption() => digunakan agar ketika 'option' yang diberikan tidak sesuai dengan yang diminta akan muncul seperti '--help'
// .strictCommands => digunakan agar ketika 'command' yang diberikan tidak sesuai dengan yang diminta akan muncul seperti '--help'
// menggunakan object sebagai parameter agar kita bisa menuliskan semua parameternya
yargs
  .command({
    command: "add",
    describe: "Membuat contact baru",
    // builder untuk menampung parameter
    builder: {
      nama: {
        alias: "n",
        describe: "Nama lengkap",
        demandOption: true, //  artinya apakah wajib di isi
        type: "string",
      },
      email: {
        alias: "e",
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        alias: "p",
        describe: "Nomer Handphone",
        demandOption: true,
        type: "string",
      },
    },
    // handler untuk mengeksekusi jika ada (menampilkan hasil)
    handler(argv) {
      // const contact = {
      //   nama: argv.nama,
      //   email: argv.email,
      //   noHP: argv.noHP,
      // };
      // console.log(contact);

      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand()
  .strictOptions()
  .strictCommands();

// menampilkan daftar semua nama & noHp contact
yargs.command({
  command: "list",
  describe: "Menampilkan semua contact",
  handler() {
    listContact();
  },
});

// menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasarkan nama",
  builder: {
    nama: {
      alias: "n",
      describe: "Nama lengkap",
      demandOption: true, //  artinya apakah wajib di isi
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// menghapus sebuah contact
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      alias: "n",
      describe: "Nama lengkap",
      demandOption: true, //  artinya apakah wajib di isi
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
