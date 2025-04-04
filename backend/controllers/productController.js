import Product from "../models/productModel.js"; // Corrected import path
import cloudinary from "../config/cloudinary.js"; 

// Create a Product
export const createProduct = async (req, res) => {
  try {
    const { product_name, price, stocks, description, category } = req.body;

    let product_images = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        product_images.push({ public_id: result.public_id, url: result.secure_url });
      }
    }

    const product = new Product({
      product_name,
      product_images,
      price,
      stocks,
      description,
      category,
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { product_name, price, stocks, description, category } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let product_images = product.product_images;
    if (req.files) {
      // Delete old images from Cloudinary
      for (const img of product.product_images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      // Upload new images
      product_images = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        product_images.push({ public_id: result.public_id, url: result.secure_url });
      }
    }

    product.product_name = product_name;
    product.price = price;
    product.stocks = stocks;
    product.description = description;
    product.category = category;
    product.product_images = product_images;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete images from Cloudinary
    for (const img of product.product_images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
