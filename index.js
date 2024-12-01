const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("./middleware/authMiddleware");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authMiddleware);


app.post("/api/products/create", async (req, res) => {
  const { name, stock, price } = req.body;
  if (!name || stock == null || price == null) {
    return res.status(400).json({ error: "All fields required" });
  }

  const product = await prisma.product.create({ data: { name, stock, price } });
  res.status(201).json(product);
});


app.get("/api/products/get", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
});

app.get("/api/products/getById/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.status(200).json(product);
});

// Update a Product (Full Update)
app.put("/api/products/put/:id", async (req, res) => {
  const { id } = req.params;
  const { name, stock, price } = req.body;

  if (!name || stock == null || price == null) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, stock, price },
    });
    res.status(200).json(product);
  } catch {
    res.status(404).json({ message: "Product not found" });
  }
});


app.patch("/api/products/patch/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json(product);
  } catch {
    res.status(404).json({ message: "Product not found" });
  }
});


app.delete("/api/products/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Product is deleted" });
  } catch {
    res.status(404).json({ message: "Product not found" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
