const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.POST || 5000;

// for connecting .env
// https://northflank.com/guides/connecting-to-a-mongo-db-database-using-node-js
require('dotenv').config();

// use middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const notesCollection = client.db("notesManager").collection("notes");

    // GET API (read all notes)
    // http://localhost:5000/notes
    app.get("/notes", async (req, res) => {
      const query = req.query;
      const cursor = notesCollection.find(query); // For receive all data pass empty object {} as query
      const result = await cursor.toArray();
      res.send(result);
    });

    // POST API (create a single note)
    // http://localhost:5000/note
    app.post("/note", async (req, res) => {
      const data = req.body;
      const result = await notesCollection.insertOne(data);
      res.send(result);
    });

    // PUT API (update a single note)
    // http://localhost:5000/note/6265a5e0835d7484216d58ec
    app.put("/note/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateNote = {
        $set: {
          userName: data.userName,
          textData: data.textData
        },
        /* modify object using spread operator
        $set: {
          ...data
        },
        */
      };
      const result = await notesCollection.updateOne(filter, updateNote, options);
      res.send(result)
    });

    // DELETE API (delete a single note)
    // http://localhost:5000/note/6265a5e0835d7484216d58ec
    app.delete("/note/:id" , async(req, res) =>{
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await notesCollection.deleteOne(filter);
      res.send(result);
    })

  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("Listening to port", port);
});
