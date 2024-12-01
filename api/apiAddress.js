const express = require("express");
const routes = express.Router();
const Address = require("../models/address");

// Them Address
routes.post("/addAddress", async(req, res)=>{
    //Tao doi tuong
    const model = new Address(req.body);
    //Luu doi tuong vao databse
    const resuls = await model.save();
    if(resuls){
        res.json({
            status: 200,
            messaga: "addAddress thanh cong",
            data: resuls,
        })
    } else{
        res.json({
            status: 400,
            messaga: "addAddress khong thanh cong",
            data: "error",
        })

    }
})

routes.delete("/deleteAddress/:id", async(req, res) =>{
    try {
        const resuls = await Address.findByIdAndDelete(req.params.id);
        if(resuls){
            res.json({
                status: 200,
                messaga: "deleteAddress thanh cong",
                date: resuls,
            })
        } else{
            res.json({
                status: 400,
                massaga: "deleteAddress khong thanh cong",
                date: "error",
            })
        }
    } catch (error) {
        res.status(400).json({messaga: error.messaga})
    }
})

routes.put("/updateAddress/:id", async(req, res) =>{
    try {
        const resuls = await Address.findByIdAndUpdate(req.params.id, req.body); 
        if(resuls){
            res.json({
                status: 200,
                massaga: "updateAddress thanh cong",
                date: resuls
            })
        } else{
            res.json({
                status: 400,
                masaga: "updateAddress khong thanh cong",
                date: "error"
            })
        }
    } catch (error) {
        res.status(400).json({messaga: error.messaga});
    }
})

routes.get("/getAddressId/:id", async(req, res) =>{
    try {
        const resuls = await Address.findById(req.params.id);
        if(resuls){
            res.json({
                status: 200,
                massaga: "lay thong tin thanh cong",
                data: resuls
            })
        } else{
            res.json({
                status: 400,
                massaga: "lay thong tin khong thanh cong",
                data: "error"
            })
        }
    } catch (error) {
        res.status(400).json({messaga: error.messaga});
    }
})

routes.get("/listAddress", async(req, res) =>{
    try {
        const resuls = await Address.find();
        if(resuls){
            res.json({
                status: 200,
                massaga: "lay danh sach thanh cong",
                data: resuls
            })
        } else{
            res.json({
                status: 400,
                massaga: "lay danh sach khong thanh cong",
                data: "error"
            })
        }
    } catch (error) {
        res.status(400).json({messaga: error.messaga});
    }
})

module.exports = routes;