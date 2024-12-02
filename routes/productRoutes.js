const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/create", async (req, res) => {
  const { name, stock, price } = req.body;
  if (!name || stock == null || price == null) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const product = await prisma.product.create({ data: { name, stock, price } });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

module.exports = router;
