const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const userCollection = client.db("NextGigDB").collection("users");
    const jobsCollection = client.db("NextGigDB").collection("jobs");
    // const userCollection = client.db("NextGigDB").collection("candidates");
    // const userCollection = client.db("NextGigDB").collection("topCompanies");
    // const userCollection = client.db("NextGigDB").collection("reviews");


    // ===========================================
    //               work space start
    // ===========================================

    //Users api
    app.post('/users', async (req, res) => {
      const user = req.body;
      const isExisting = await userCollection.findOne({ email: user?.email });
      // console.log(isExisting)
      if (isExisting) {
        return res.send({ message: 'Sign In successfully' })
      }

      const result = await userCollection.insertOne(user);
      res.send(result)
    })

    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    app.patch('/users/:id', async (req, res) => {
      const id = req.params.id;
      const info = req.body;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          userName: info.userName,
          email: info.email,
          address: info.address,
          about: info.about,
          phone: info.phone,
          picUrl: info.picUrl,
          nationality: info.nationality,
        }
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    // jobs api
    app.post('/jobs', async (req, res) => {
      const job = req.body;
      const result = await jobsCollection.insertOne(job);
      res.send(result)
    })

    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await jobsCollection.deleteOne(filter);
      res.send(result)
    })

    app.get('/jobs', async (req, res) => {
      const result = await jobsCollection.find().toArray();
      res.send(result)
    })

    app.patch('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const info = req.body;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateDoc = {
        $set: {

          jobTitle: info.jobTitle,
          userName: info.userName,
          details: info.details,
          email: info.email,
          address: info.address,
          salary: info.salary,
          about: info.about,
          phone: info.phone,
          level: info.level,
          post: info.post,
          action: info.action,
          variant: info.variant,
          companyLogo: info.companyLogo,
        }
      };
      const result = await jobsCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    })




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
app.get('/', (req, res) => {
  res.send('This is NextGig server is running')
})

// app listing
app.listen(port, () => {
  console.log('NextGig server is  running on Port:', port)
})