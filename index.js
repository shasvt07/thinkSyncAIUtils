import dotenv from "dotenv";
import cors from'cors';
import cookieParser from "cookie-parser";
import { createRequire } from "module";
import express from "express";
import ImageRoutes from "./routes.js";

const require = createRequire(import.meta.url);
dotenv.config();
var bodyParser = require('body-parser');


const app = require("express")();
const server =require("http").createServer(app);



app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser());
app.use(cors());
app.use('/api', ImageRoutes);



const PORT = process.env.PORT || 8081;

server.listen(PORT, () => {
  cors:true
  console.log("connnected to the port");
  })
app.use((err , req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

app.get('/', (req, res) => {
	res.send('Running');
});

