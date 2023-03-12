console.log("Hello World");

function cetakNama(nama) {
  return `Hi, nama saya ${nama}`;
}

const sumTwoNumber = (a, b) => {
  console.log(`Angka ${a} + ${b} = ${a + b}`);
};

// moduel exports
// ketika kita melakukan exports artinya isi dari moduel ini dapat di akses dari luar module ketika modul lain menggunakan keyword 'require'
module.exports = { cetakNama, sumTwoNumber };
