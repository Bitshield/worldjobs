const  express = require ( 'express');
const mongoose = require ( 'mongoose' );
const redis = require ( 'redis' );
const os = require ( 'os' );


// configuration for server with express 
const port =process.env.PORT || 8000;
const app = express();

//? connect to redis server
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
redisClient.on('error', err => console.log('Redis Client Error 🪓', err));
redisClient.on('connect', () => console.log('Redis Connected Success 🛩️'));
redisClient.connect();


// configuration of postgres database
const URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
mongoose
.connect(URI)
.then(() => console.log('connect to mogoose database 🚀'))
.catch ((err) => console.log("Failed to connect DATABASE",err));




app.get('/',async (req, res) => {
   await redisClient.set('order','order.....done')
   console.log(`trafic from ====> ${os.hostname} 🔥,....${os.port} 🏹,....${os.homedir} 😄`)
    res.send('<h2>Welcome!!!!!------->hello github watch tower :) ☺️<------</h2>');
});

app.get('/data', async(req, res) => {
    const order = await redisClient.get('order')
    res.send(`<h2>order done</h2>,<a>${order}</a>`);
});


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});