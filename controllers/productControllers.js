const {prisma} = require('../db/config');
const createProduct=async(req,res)=>{
  const {name,stock,price} = req.body
  if(!name || !stock || !price){
    return res.status(400).json({"error": "All fields required"})
  }
  const product = await prisma.product.create({
    data:{
        name, stock, price
    }
  })
  return res.status(201).json(product)

}
const getProduct =async(req,res)=>{
  const product = await prisma.product.findMany()
  return res.status(200).json(product)
}
const getProductById=async(req,res)=>{
  const {id} = req.params
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id)
    }
  })
  return res.status(200).json(product)
}
const updatedProduct=async(req,res)=>{
  const {id}=req.params
  const {name,stock,price}= req.body
  const product= await prisma.product.update({
    where:{id:Number(id)},
    data:{name,stock,price}
  })
  res.status(200).json(product)

};

const partialUpdate =async(req,res)=>{
  const {id}=req.params
  const {stock}=req.body
  const product = await prisma.product.update({
    where :{id:Number(id)},
    data:{stock}
  })
  res.status(200).json(product)
}

const deleteProduct= async(req,res)=>{
  const {id}=req.params

  const product= await prisma.product.delete({
    where:{id:Number(id)}
  })
  res.status(200).json({"message":"Product is deleted"})
}
module.exports={createProduct,getProduct,getProductById,partialUpdate,updatedProduct,deleteProduct}


