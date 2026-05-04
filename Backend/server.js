const express= require('express');
const path =require('path');
const connectDB = require('./db/connectDB');

const app = express();
const PORT = 3000;
const MONGO_URL = "mongodb://localhost:27017/e-commerce-web-app";

//routes
const productRoute = require('./Routes/productRoute');


//middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World')
});
app.use("/product",productRoute);


connectDB(MONGO_URL)
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})