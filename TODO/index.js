const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const UserRoute = require('./routes/UserRoutes');

const PORT = process.env.SERVER_PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';

mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log('MongoDb connected');
        app.listen(PORT,()=>{
            console.log(`server started and running on port ${PORT}`);
        });
    }).catch((error)=>console.log('MongoDb error', error));

app.listen(PORT,()=>{
    console.log(' server started and running on port 3000');
});

app.get('/test',(req,resp)=>{
    return resp.json({'massage':'server started'})
});

app.use('/api/v1/users', UserRoute);