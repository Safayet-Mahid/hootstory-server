const express = require("express");
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express()

app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = "mongodb+srv://blogDb:NDtpW2EtstFukA4p@cluster0.kizi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

async function run() {

    try {
        await client.connect();

        const database = client.db("blogDb");
        const blogsCollection = database.collection("blogs")

        app.get("/blogs", async (req, res) => {
            const cursor = blogsCollection.find({})

            const blogs = await cursor.toArray();

            res.send(blogs)


        })
    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is live ")
});

app.listen(port, () => {
    console.log("port to listening at ", port)
})