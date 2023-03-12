// console.log("Hello AY-Blog");

// const nama = "Alfian Yulianto";
// console.log(nama);

// const cetakNama = (nama) => `Hi, nama saya ${nama}`;
// console.log(cetakNama("Alfian Yulianto"));

// ---------------------------------------------------------------------------------------------------
// objcek global window JavaScript di konteks browser
// console.log(window);   // error karena object window berada di dalam browser bukan di NodeJS

// ---------------------------------------------------------------------------------------------------
// memanggil file lain denga NodeJS
// require("./coba");
const { cetakNama, sumTwoNumber } = require("./coba");

console.log("Hello AY-Blog");

console.log(cetakNama("Alfian"));

sumTwoNumber(10, 10);
