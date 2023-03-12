function cetakNama(nama) {
  return `Hi, nama saya ${nama}`;
}

// // ketika hanya ada satu statement yang diexports
// module.exports = cetakNama;

const PI = 3.14;

const mahasiswa = {
  nama: "Budi Doremi",
  umur: 22,
  cetakMhs() {
    return `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun.`;
  },
};

class Orang {
  constructor() {
    console.log("Objek orang telah dibuat");
  }
}

// // ketika ada lebih dari satu statement yag diexports
// // kita kirim sebagai properti atau method di dalam methodnya
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// kita juga bisa melakukan export dengan assignment object
module.exports = { cetakNama, PI, mahasiswa, Orang };
