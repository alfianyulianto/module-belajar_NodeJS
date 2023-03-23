const { MongoClient } = require("mongodb");

// const uri = "mongodb://127.0.0.1:27017";
const dbName = "alfian";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect((error, result) => {
//   if (error) console.log("Koneksi gagal!");

//   // console.log("Koneksi berhasil!");

//   // Menambahkan satu data ke collection mahasiswa

// });

// Replace the uri string with your connection string.
const uri = `mongo"mongodb://ac-jz1itwp-shard-00-00.1wwjfmo.mongodb.net:27017,ac-jz1itwp-shard-00-01.1wwjfmo.mongodb.net:27017,ac-jz1itwp-shard-00-02.1wwjfmo.mongodb.net:27017/myFirstDatabase?replicaSet=atlas-36vlyq-shard-0" --ssl --authenticationDatabase admin --username alfianyulianto --password <password>`;

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db(dbName);
    const movies = database.collection("mahasiswa");
    // Query for a movie that has the title 'Back to the Future'
    const movie = await movies.findOne();
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
