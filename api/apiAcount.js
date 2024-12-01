const express = require("express");
const routes = express.Router();
const Acount = require("../models/acount");


routes.post("/addAcount", async (req, res) => {
    // Tao doi tuong
    const model = new Acount(req.body);
    // Luu doi tuong vao database
    const resuls = await model.save();
    if (resuls) {
        res.json({
            status: 200,
            massage: "Them tai khoan thanh cong",
            data: resuls,
        })
    } else {
        res.json({
            status: 400,
            massage: "Them tai khoan khong thanh cong",
            data: "error",
        })
    }
})

routes.get("/getAllAcount", async (req, res) => {
    try {
        const resuls = await Acount.find();
        if (resuls) {
            res.json({
                status: 200,
                massage: "Lay danh sach tai khoan thanh cong",
                data: resuls,
            })
        } else {
            res.json({
                status: 400,
                massage: "Lay danh sach tai khoan khong thanh cong",
                data: "error",
            })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = routes;