const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cwr8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db("naims-Hcamp");
      const serviceCollection = database.collection("h-services");
      const eventCollection = database.collection("my-events")
     
    console.log('database connected');
  
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

  app.get('/',(req,res)=>{
      console.log('Server is running');
      res.send('Server ready for run')
  })

  app.listen(port,()=>{
      console.log('http//localhost:',port);
  })