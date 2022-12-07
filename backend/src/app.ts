import express from 'express';
import logger from 'morgan';
import cookieparser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//import routes
import indexRoute from './routes/indexRoute';
import userRoute from './routes/userRoute';
import authorRoute from './routes/authorRoute';
import adminRoute from './routes/adminRoute';



//configure database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});


const PORT = process.env.PORT || 5000;

//use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());


//use routes
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/authors', authorRoute);
app.use('/admins', adminRoute);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;