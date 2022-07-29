// importing and setup
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware cors and express json
app.use(cors());
app.use(express.json());
// dotenv code
require("dotenv").config();
// Port
const port = process.env.PORT || 5000;



const uri = `mongodb+srv://${process.env.user}:${process.env.password}@todo.6i5po.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const data = client.db("Todo").collection("Task");
    console.log("DB Connected");
    
    //Reading All Tasks
    app.get("/all", async (req, res) => {
      const query = {};
      const cursor = data.find(query);
      task = await cursor.toArray();
      res.send(task);
    });

    //Adding One Task
    app.post("/all", async (req, res) => {
      const newTask = req.body;
      console.log(`New Task added ${newTask}`);
      const product = await data.insertOne(newTask);
      res.send(product);
    });

  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Paratronics Server is Running");
});

app.listen(port, () => {
  console.log(`Port is listening to ${port}`);
});