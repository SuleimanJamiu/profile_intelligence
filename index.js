const express = require("express");
const router = require("./router/user.routes");
const app = express();

require("dotenv").config();

PORT = process.env.PORT || 4000

app.use(express.json());``
app.use('/api', router);



app.listen(PORT, ()=>{
    //connectDB();
    console.log(`Application is running on Port ${PORT}`);
})