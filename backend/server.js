
import express from 'express';
import { PORT,mongoURL } from './config.js';
import mongoose from 'mongoose';

import bookRoute from './routes/bookRoutes.js'
import cors from 'cors'

const app = express();

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(234).send("Welcome to our book store")
})


app.use('/books',bookRoute)






mongoose.connect(mongoURL).then(()=>{
    console.log("App is connected to database")
    app.listen(PORT,()=>{
        console.log(`APP is listening on port ${PORT}`)
    });

}).catch((error)=>{
    console.log(error);
});



