const express = require("express");
const routes = express.Router();
const Product = require("../models/product");
const upload = require("../config/upload");
const fs = require("fs");
const path = require("path");

// Hàm xử lý lấy đường dẫn ảnh
const getUploadedImages = (files, req) => {
    return files ? files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) : [];
};

// Xóa tệp ảnh từ thư mục
const deleteUploadedImages = (images) => {
    images.forEach((imagePath) => {
        const filePath = path.join(__dirname, "../uploads", imagePath.split("/uploads/")[1]);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
};

// Thêm sản phẩm
routes.post("/addProduct", upload.array('images', 5), async (req, res) => {
    try {
        const { files } = req;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "Không có hình ảnh nào được tải lên" });
        }

        const urlImage = files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        const model = new Product({ ...req.body, images: urlImage });
        const result = await model.save();

        res.status(201).json({
            status: 200,
            message: "Thêm sản phẩm thành công",
            data: result,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Cập nhật sản phẩm
routes.put("/updateProduct/:id", upload.array('images', 5), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 404, message: "Sản phẩm không tồn tại" });
        }

        const { files } = req;
        const newImages = getUploadedImages(files, req);

        // Cập nhật thông tin sản phẩm
        product.set({
            ...req.body,
            images: [...product.images, ...newImages] // Giữ ảnh cũ và thêm ảnh mới
        });

        const result = await product.save();
        res.json({
            status: 200,
            message: "Cập nhật sản phẩm thành công",
            data: result,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Xóa sản phẩm
routes.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 404, message: "Sản phẩm không tồn tại" });
        }

        // Xóa ảnh khỏi thư mục
        deleteUploadedImages(product.images);

        // Xóa sản phẩm khỏi cơ sở dữ liệu
        await Product.findByIdAndDelete(req.params.id);
        res.json({
            status: 200,
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lấy danh sách sản phẩm (hỗ trợ phân trang)
routes.get("/listProduct", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Product.countDocuments();

        res.json({
            status: 200,
            message: "Lấy danh sách sản phẩm thành công",
            data: products,
            pagination: {
                total,
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lấy chi tiết sản phẩm theo ID
routes.get("/getProduct/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 404, message: "Sản phẩm không tồn tại" });
        }
        res.json({
            status: 200,
            message: "Lấy sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = routes;
