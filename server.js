const express = require('express');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path')

dotenv.config()


if(process.env.Node_Env === 'production'){
    app.use(express.static(path.join(__dirname, './fontend/dist')))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, './fontend/dist/index.html'))
    })
}
if(process.env.Node_Env === 'production'){
    app.use(cors({
        origin : 'http://localhost:3000/',
        Credentials : true
    }))
}else{
    app.use(cors({
        Credentials : true
    }))
}

const DBCONNECT = async() => {
    try {
        if(process.env.Node_Env == "local"){
                    await mongoose.connect(process.env.LOCAL_DB_URI);
                    console.log("Local Connection")

        }else{
            await mongoose.connect(process.env.MONGODB_URI) 
            console.log("cloud Connection")

        }
    } catch (error) {
      console.log("failed Connection")

    }
}

DBCONNECT()
const port = process.env.port
app.listen(port,()=>{
    console.log("server is running")
})