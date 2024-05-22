const express = require("express");
const morgan = require("morgan");
const blogsRouter = require("./routes/blogs")
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();


//definition des middlewares
app.use(express.json())
app.use(morgan("dev"));
app.use(cors("*"))


//defintion des routes
app.use("/blogs",blogsRouter)




// get all blogs
/*function verifyAdmin(req,res,next){
    if (req.query.username =="admin" && req.query.password=="1234"){
        next()
    }else{
        res.status(403).json({message:"not authorised to do this operation"})
    }
}*/

/*app.get("/blogs" ,verifyAdmin,(req, res) => {
  res.status(200).json(blogs);
});*/
// get single blog by id




connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://test:test@cluster0.lmoyc.mongodb.net/idara', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("db connected")
  } catch (error) {
    console.log(error.message)
  }
}




app.listen(8000, () => {
  connectDb()
  console.log("listening on port 8000 ! ");
});
