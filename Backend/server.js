const express= require('express')

const app = express();


//routes
const productRoute = require('./Routes/productRoute');

app.get('/', (req, res) => {
  res.send('Hello World')
});
app.use(express.json());
app.use("/product",productRoute);


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})