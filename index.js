const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
var cors = require('cors')

// IMPORT ALL ROUTERS
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const catRouter = require('./routes/catagoriesRouter')

app.use(express.json());
app.use(cors());

dotenv.config();

const port = process.env.PORT || 9000;

// MULTER FOR IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"Images");
  },
  filename: (req,file,cb)=>{
    cb(null,req.body.name);
  }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single(), (req,res)=>{
  res.status(200).json("File has been uploaded");
})

// MONGO DB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("db connected..")).catch(err=>console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome')
})

// USE ALL ROUTERS
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/post",postRouter);
app.use("/api/catagories",catRouter);

// NODE SERVER
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


