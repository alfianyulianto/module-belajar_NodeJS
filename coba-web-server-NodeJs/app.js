const http = require("http");
const fs = require("fs");
const port = 3000;

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

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  // mengabil req url
  const url = req.url;
  // console.log(url);
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
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server is listening in http://127.0.0.1:${port}`);
});
