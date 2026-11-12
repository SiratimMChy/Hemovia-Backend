const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ybtdeyi.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const database = client.db('bloodDonationDB');
const usersCollection = database.collection('users');
const requestsCollection = database.collection('requests');
const paymentCollection = database.collection('payments');
const centersCollection = database.collection('centers');

let isConnected = false;
async function connectDB() {
    if (!isConnected) {
        await client.connect();
        isConnected = true;
        console.log('Connected to MongoDB successfully.');
    }
}

module.exports = {
    client,
    connectDB,
    usersCollection,
    requestsCollection,
    paymentCollection,
    centersCollection
};
