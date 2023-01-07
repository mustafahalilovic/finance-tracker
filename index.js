const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); // req.body
app.use(cors());

// routes

// register and login routes
app.use("/auth", require("./routes/jwtAuth"));

// dashboard route
app.use("/dashboard", require("./routes/dashboard"));


app.listen(5000, ()=>{
    console.log('server started on port 5000');
});