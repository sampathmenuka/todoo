const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.SERVER_PORT || 3000;
 
app.listen(3000,()=>{
    console.log(' server started and running on port 3000');
})

app.get('/test',(req,resp)=>{
    return resp.json({'massage':'server started'})
});