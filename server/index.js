const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const dotenv=require("dotenv")


const app=express();
app.use(bodyParser.json())
dotenv.config()

app.listen(3000,()=>console.log(`Running....`));

app.get('/',async (req,res)=>{
    res.send("Hey Brother")
})

// mongoose
//        .connect("")
//        .then(() => {
//         console.log("Connected to MongoDB")
//         app.listen(3000,()=>console.log(`Running....`));})
//        .catch(err => console.log(err));