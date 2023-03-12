console.log(window); // object windoe hanya berjalan di browser
console.log(window.alert("Hello World!"));

// Ketika kita membuat apapun statement maka statement tersebut akan dimasukan di dalam objek global window
// artinya maka ketika kita punya file JavaScript lain yang terpisah dari file satu.js dan kita panggil di file index.html maka statement di file satu.js dapat di gunkana di file JS lain.
function cetakNama(nama, alamat) {
  return `Hi, nama saya ${nama}. Alamat saya di ${alamat}`;
}

// console.log(cetakNama("Alfian"));
