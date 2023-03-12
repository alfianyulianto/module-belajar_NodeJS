// // urutan melakukan require (core module, local module, third party module)
// const fs = require("fs"); // core module
// const cetakNama = require("./coba"); // local module -> local module pasti menggunakan ./ atau ../
// const moment = require("moment"); // third party module / npm module / node_modules

const coba = require("./coba");
console.log(coba); // { cetakNama: [Function: cetakNama], PI: 3.14 }
console.log(coba.cetakNama("Alfian Yulianto"));
console.log(`PI ${coba.PI}`);
console.log(coba.mahasiswa.cetakMhs());
new coba.Orang();
