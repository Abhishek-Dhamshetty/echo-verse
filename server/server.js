const exp=require('express')
const app=exp();
require('dotenv').config();  //process.env   here process is a global obj in backend
const mongoose=require('mongoose');
const authorApp = require('./APIs/authorApi');
const adminApp = require('./APIs/adminApi');
const userApp = require('./APIs/userApi');
const cors=require('cors')
app.use(cors())

const port=process.env.PORT || 4000;

//db connection
mongoose.connect(process.env.DBURL)
.then(()=> {app.listen(port,()=> console.log(`server listening on port ${port} ..`))
    console.log('DB connection success')
})
.catch(err=> console.log('Error in DB connection ',err));

//body parser middleware
app.use(exp.json())
//connect API routes
app.use('/author-api',authorApp);
app.use('/admin-api',adminApp);
app.use('/user-api',userApp);


//error handler
app.use((err,req,res,next)=>{
    console.log('err object in express error handler :',err)
    res.send({mesaage:err.message})
})