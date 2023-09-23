import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// config
import { PORT, mongoURL } from "./config.js";

//models
import { Book } from './models/bookModel.js';

// routes
import booksRoute from './routes/booksRoute.js';


const app = express();

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

app.use(cors());

//middleware for parsing request body
app.use(express.json());

// middleware for routes
app.use('/books', booksRoute);

// middleware for handling CORS policy

// this will allow all origins with default of cors(*)
// app.use(cors());


// allow custom origins with cors only allowed origin can access our server
// app.use(
//     cors({
//         origin:'http://localhost:4000/books',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:[]
//     })
// )

// app test route
app.get('/', (req, res) => {
    console.log("i m get request");
    // console.log("I m res obj",res);
    return res.status(234).send('Welcome to masha tech')
})


mongoose.connect(mongoURL).then(() => {
    console.log("App is connected with mongodb");
    app.listen(PORT, () => {
        console.log("App is running", PORT);
    })
}).catch((err) => {
    console.log("err connecting mongo", err);
})
