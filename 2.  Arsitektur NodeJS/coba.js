// Synchronouse

// const getUserSync = (id) => {
//   const name = id === 1 ? "Alfian" : "Yulianto";
//   return { id, name };
// };

// const userSatu = getUserSync(1);
// console.log(userSatu);

// const userDua = getUserSync(2);
// console.log(userDua);

// const halo = "Hello World!";
// console.log(halo);

// Asychronouse

const getUserAsync = (id, callback) => {
  const time = id === 1 ? 3000 : 2000;

  setTimeout(() => {
    const name = id === 1 ? "Alfian" : "Yulianto";
    callback({ id, name }); // menjaankan sebuah callback dari dengan parameetr 'hasil'
  }, time);
};

const userSatu = getUserAsync(1, (hasil) => {
  console.log(hasil);
});

const userDua = getUserAsync(2, (hasil) => {
  console.log(hasil);
});

const halo = "Hello World!";
console.log(halo);
