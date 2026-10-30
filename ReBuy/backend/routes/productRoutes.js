const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET: Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});

// POST: Create a product
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      condition,
      location,
      imageUrl,
    } = req.body;

    // 1. Validate price
    const numericPrice = Number(price);

    if (
      price === undefined ||
      price === null ||
      price === "" ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return res.status(400).json({
        message: "Price must be a valid non-negative number",
      });
    }

    // 2. Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      !condition
    ) {
      return res.status(400).json({
        message: "Please provide all required product details",
      });
    }

    // 3. Create product in MongoDB
    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: numericPrice,
      category: category.trim(),
      condition,
      location,
      imageUrl,
    });

    // 4. Send success response
    res.status(201).json({
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.error("Create product error:", error.message);

    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        message: "Invalid product data",
      });
    }

    res.status(500).json({
      message: "Failed to add product",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});


module.exports = router;