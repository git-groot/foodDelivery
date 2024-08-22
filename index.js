const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRouter');
const menuRoute=require('./Routes/menuRoute');

dotenv.config();
const port = process.env.PORT;
const dburl = process.env.DB_URL;

app.use(express.json());


// db Connection
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((con) => {
        console.log('DB connected sucessfully,to host');
    })
    .catch(() => {
        console.log('DB connection error');
    });

    //routes 

app.use('/user', userRoute);
app.use('/menuItem',menuRoute);


// port
app.listen(port, () => {
    console.log(`server run in this port ${port}`);
})

