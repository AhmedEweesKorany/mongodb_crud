const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model")
const app = express();
const port = 3010;
app.use(express.json())
// init connection with mongog db
mongoose
  .connect(
    `mongodb+srv://ahmedewaisvi34:Ej5jMNZ6uUu5JU3T@backenddb.kuvlevq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("connected to daabase");
  })
  .catch((e) => {
    console.log("error happend", e);
  });

  // get all products fromm dataBase
app.get("/", async(req, res) => {
  const products = await Product.find({})
  res.status(200).json(products);
});

// get single product by it's id
app.get("/product/:id",async(req,res)=>{
try{
  const userId = req.params.id 
  const product = await Product.findById(userId)
  res.status(200).json(product)
}catch(e){
  res.status(500).json({message:"internal serve error",e:e.message})
}
})

// create new product 
app.post("/api/products",async(req,res)=>{
 try {
 const product =  await Product.create(req.body)
  res.status(200).json({message:"successful",data:product})
 } catch (error) {
  res.status(500).json({message:"internal server error",error})
 }
})

//update product by id 
app.put("/api/updateProduct/:id",async(req,res)=>{
try{
  const {id} = req.params
  const product = await Product.findByIdAndUpdate(id,req.body)
  if(!product) res.status(404).josn({message:"item not found"})
  res.status(200).json({message:"updated succesffullt"})
}catch(e){
  res.status(500).json({message:"internal server error",e:e.message})
}
})
app.listen(port, () => {
  console.log(`you arr is running now on http://localhost:${port}`);
});

// delete single product by it's id 
app.delete("/api/deleteProduct/:id",async(req,res)=>{
  const {id} = req.params
  try{
const product  = await Product.findByIdAndDelete(id)
res.status(200).json({message:"product updated successully"})
  }catch(e){
    res.status(500).josn({message:"internal server error",e:e.message})
  }
})