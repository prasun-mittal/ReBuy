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

module.exports = router;
