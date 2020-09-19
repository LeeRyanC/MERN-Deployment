const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

require("./server/config/config")

const petRoutes = require("./server/routes/routes")
petRoutes(app);

app.listen(8003, () => console.log("The server is all fired up on port 8003"));