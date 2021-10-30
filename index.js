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
      const database = client.db("naims_world");
      const bannerCollection = database.collection("banner");
      const rideCollection = database.collection("all_rides");
      const bookingCollection = database.collection("all_booking");
      
      console.log('database connected');
    // get banner images 
    app.get("/banners",async(req,res)=>{
      const cursor = bannerCollection.find({});
      const banners = await cursor.toArray();
      res.json(banners)
    })
  
    // get rides 
    app.get("/rides",async(req,res)=>{
      const cursor = rideCollection.find({});
      const rides = await cursor.toArray();
      res.json(rides);
    })

    // get single ride 
    app.get("/rides/:id",async(req,res)=>{
         const id = req.params.id;
         const filter = {_id: ObjectId(id)}
         const singleRide = await rideCollection.findOne(filter);
         console.log(singleRide);
         res.json(singleRide);
    })

    // send data to database 
    app.post("/booking",async(req,res)=>{
      const query = req.body;
      const result = await bookingCollection.insertOne(query);
      res.json(result)
    })

    // get myevent or order 
    app.get("/myevents",async(req,res)=>{
      const cursor = bookingCollection.find({});
      const events = await cursor.toArray();
      console.log(events);
      res.json(events);
    })

    // delete event 
      app.delete('/myevents/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const result = await bookingCollection.deleteOne(query);
        res.json(result);
      })

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