// package Validator untuk melaukan sanitasi dan memvalidasi string
const validator = require("validator");

// // validasi email
// const checkEmail = validator.isEmail("alfian@gmail.com");
// console.log(checkEmail);

// // validasi phone
// const checkPhone = validator.isMobilePhone("080217432366", "id-ID");
// console.log(checkPhone);

// // validasi mengecek apakah string merupakan slug
// const checkSlug = validator.isSlug("alfian-yulianto");
// console.log(checkSlug);

// // validasi checkStrongPassword
// const checkStrongPassword = validator.isStrongPassword("Iyan172000", {
//   minLength: 8,
//   minLowercase: 1,
//   minUppercase: 1,
//   minNumbers: 1,
//   minSymbols: 1,
//   returnScore: true,
//   pointsPerUnique: 1,
//   pointsPerRepeat: 0.5,
//   pointsForContainingLower: 30,
//   pointsForContainingUpper: 30,
//   pointsForContainingNumber: 30,
//   pointsForContainingSymbol: 10,
// });
// console.log(checkStrongPassword);

// // validasi angka
// // const checkNumeric = validator.isNumeric("8127197");
// const checkNumeric = validator.isNumeric("8127197AQ");
// console.log(checkNumeric);

// package chalk untuk mewarnai terminal CLI
const chalk = require("chalk");
console.log(chalk.redBright("Alfian Yulianto")); //  huruf warna merah terang
console.log(chalk.yellow.bgWhite.bold("Hello World!")); // color huruf kuning, background putih serta hurufnya bold
console.log(chalk.underline.green("Budi Doremi")); // huruf ada garis bawahnya serta berwarna hijau
console.log(
  chalk.magenta("Hello") + " ALfian Yulianto" + chalk.yellowBright("!")
);

// menggunakan tamplate literal pada chalk
const pesan = chalk`Lorem {red ipsum dolor}, sit {bgBlue amet consectetur} adipisicing elit. {bgGreen.bold.red Id, nobis.} ${chalk.yellow(
  " Hi, Alfian Yulianto apa kabar?"
)}`;
console.log(pesan);

console.log(`
CPU: ${chalk.red("90%")}
RAM: ${chalk.green("40%")}
DISK: ${chalk.yellow("70%")}
`);
