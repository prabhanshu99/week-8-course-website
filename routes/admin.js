const { Router } = require("express");
const {adminModel, courseModel}=require("../db")
const { adminMiddleware } = require("../middlewares/admin");
const jwt=require("jsonwebtoken");
const{JWT_ADMIN_PASSWORD}=require("../config");

const adminRouter=Router();

adminRouter.post("/signup", async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;

    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        message:"signup endpoint"
    })
})

adminRouter.post("/signin", async function(req,res){
    const {email,password}=req.body;

    const admin =await adminModel.findOne({
        email,
        password
    })

    if(admin){
        const token =jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD)

        res.json({
            token
        })
    }
    else{
        res.json({
        message:"signin endpoint"
    })
    }
})

adminRouter.post("/courses",adminMiddleware,async function(req,res){
    const adminId=req.userId;

    const{title,descrption,imageUrl,price}=req.body;

    const course= await courseModel.create({
        title:title,
        descrption:descrption,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })

    res.json({
        message:"course created",
        courseId:course._Id
    })
})

adminRouter.put("/courses",adminMiddleware,async function(req,res){
    const adminId=req.userId;

    const{title,descrption,imageUrl,price,courseId}=req.body;

    const course= await courseModel.updateOne({
        _Id:courseId,creatorId:adminId
    },{
        title:title,
        descrption:descrption,
        imageUrl:imageUrl,
        price:price,
    })

    res.json({
        message:"course updated",
        courseId:course._Id
    })
    res.json({
        message:"all courses"
    })
})

adminRouter.get("/courses/bulk",adminMiddleware,async function(req,res){
    const adminId=req.userId;

    const course= await courseModel.find({
        creatorId:adminId
    })

    res.json({
        message:"these are your courses"

    })
})

module.exports={
    adminRouter:adminRouter
}