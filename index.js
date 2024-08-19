const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRouter');

dotenv.config();
const port = process.env.PORT;
const dburl = process.env.DB_URL;

app.use(express.json());

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((con) => {
        console.log('DB connected sucessfully,to host');
    })
    .catch(() => {
        console.log('DB connection error');
    });

app.use('/user', userRoute)



app.listen(port, () => {
    console.log(`server run in this port ${port}`);
})
