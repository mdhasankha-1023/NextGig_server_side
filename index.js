const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('@dotenvx/dotenvx').config()
const cors = require('cors');
const app = express();
const port = 5000;

// middle-wares
app.use(cors())
app.use(express.json())

// mongodb is started
const uri = `mongodb+srv://${process.env.DOTENV_DB_USER}:${process.env.DOTENV_DB_PASS}@cluster0.kgqmoa1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // database collections:
    // const userCollection = client.db("NextGigDB").collection("users");
    // const userCollection = client.db("NextGigDB").collection("jobs");
    // const userCollection = client.db("NextGigDB").collection("candidates");
    // const userCollection = client.db("NextGigDB").collection("topCompanies");
    // const userCollection = client.db("NextGigDB").collection("reviews");


    // ===========================================
    //               work space start
    // ===========================================





    // ===========================================
    //                   End...
    // ===========================================






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB is successfully running on NextGig server");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

// mongodb is end


// first get for testing
app.get('/', (req, res)=> {
    res.send('This is NextGig server is running')
})

// app listing
app.listen(port, ()=> {
    console.log('NextGig server is  running on Port:', port)
})