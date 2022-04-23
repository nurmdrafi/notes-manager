const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectID = require("mongodb").ObjectID;
const port = process.env.POST || 5000;

// use middleware
app.use(cors());
app.use(express.json());

/* 
user: 		dbuser1
password: 	jKlSSlyQ4knl78fa
*/

const uri =
  "mongodb+srv://dbuser1:jKlSSlyQ4knl78fa@cluster0.jpd6w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
    try{
        await client.connect();
        const collection = client.db("notesManager").collection("notes");
        console.log("connected");
    } finally{

    }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send({ message: "Success" });
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
