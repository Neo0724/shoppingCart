const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./Routes/user.js')
const ShoppingCartRouter = require("./Routes/cart.js")
app.use(cors())
app.use(express.json())


const port = process.env.port || 3000;

app.listen(port, () => console.log(`Running on port ${port}`))

mongoose.connect(
  "mongodb+srv://TashiNeo:neoben007@shoppingcart.lvf4uu5.mongodb.net/shoppingcart?retryWrites=true&w=majority"
);

app.use('/auth', userRouter)
app.use('/cart', ShoppingCartRouter)
