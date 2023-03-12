require("dotenv").config(); // melakuakn 'require' ke package 'dotenv'
const http = require("http");
const fs = require("fs");

// memanggil variabel di file.env
// console.log(process.env.PORT); // 3000
// console.log(process.env.ENV_HOSTNAME); // http://127.0.0.1

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error: data not found!");
    } else {
      res.write(data);
    }
    res.end();
  });
};

// membuat server
// parameter 'res' : apa yang
// http.createServer(option, requestListener);
// requestListener : merupakan sebuah callback
const server = http.createServer((req, res) => {
  // res.writeHead() => mengirimkan 'response header' hasil dari 'request'
  // terdapat 2 parameter
  // parameter pertama 'status code'
  // parameter kedua berupa object dan terdapat propery 'Content-Type' : 'text/html
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  // jika ingin membedakan halaman
  const url = req.url;
  switch (url) {
    case "/about":
      renderHTML("./about.html", res);
      break;
    case "/contact":
      renderHTML("./contact.html", res);
      break;
    default:
      renderHTML("./index.html", res);
      break;
  }

  // if (url === "/about") {
  //   // res.write("<h1>Ini adalah halaman about</h1>");
  //   // res.end();

  //   // menampilkan file html
  //   renderHTML("./about.html", res);
  // } else if (url === "/contact") {
  //   // res.write("<h1>Ini adalah halaman contact</h1>");
  //   // res.end();

  //   // menampilkan file html
  //   renderHTML("./contact.html", res);
  // } else {
  //   // res.write("<h1>Ini adalah halaman home</h1>");
  //   // res.end();

  //   // menampilkan file html
  //   renderHTML("./index.html", res);
  // }
});

// .listen(port, hostname?=localhost, callback)
server.listen(process.env.ENV_PORT, process.env.ENV_HOSTNAME, () => {
  console.log(
    `Server is listening in http://${process.env.ENV_HOSTNAME}:${process.env.ENV_PORT}`
  );
});
