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

    if (
      !name?.trim() ||
      !description?.trim() ||
      price === undefined ||
      price === null ||
      price === "" ||
      !category?.trim() ||
      !condition
    ) {
      return res.status(400).json({
        message: "Please provide all required product details",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      condition,
      location,
      imageUrl,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
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
