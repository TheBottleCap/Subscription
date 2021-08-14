
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    //neeche ye permissions mandate hai taaki deprecating error naa aaye
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() =>{
    console.log("success connection");
}).catch((err)=> console.log("error aagay vai: ",err));