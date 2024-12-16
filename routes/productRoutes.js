const express = require('express');
const router = express.Router();
const {prisma} = require('../db/config');
router.post('/create', async(req,res)=>{
  const {name,stock,price} = req.body
  if(!name || !stock || !price){
    return res.status(400).json({"error": "All fields required"})
  }
  const prod = await prisma.product.create({
    data:{
        name, stock, price
    }
  })
  return res.status(201).json(
    prod
  )
})
router.get('/get', async(req,res)=>{
  const pro = await prisma.product.findMany()
  return res.status(200).json(pro)
})
router.get('/getById/:id', async(req,res)=>{
  const {id} = req.params
  const pro = await prisma.product.findUnique({
    where: {
      id: Number(id)
    }
  })
  return res.status(200).json(pro)
})
router.put('/put/:id', async(req,res)=>{
  const {id} = req.params
  const {name,stock,price} = req.body
  const pro = await prisma.product.update({
    where :{
      id: Number(id)
    },
    data:{
      name,stock,price
    }
  })
  return res.status(200).json(pro)
})
router.patch('/patch/:id', async(req,res)=>{
  const {stock} = req.body
  const {id} = req.params
  const pro = await prisma.product.update({
    where:{
      id: Number(id)
    },
    data:{
      stock
    }
  })
  res.status(200).json(pro)
})
router.delete('/delete/:id', async(req,res)=>{
  const {id} = req.params
  const pro = await prisma.product.delete({
    where:{
      id: Number(id)
    }
  })
  res.status(200).json({
    "message":"Product is deleted"
  })
})
module.exports = router;


