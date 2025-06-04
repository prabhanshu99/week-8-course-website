const { Router } = require("express");
const {userModel}=require("../db");
const { userMiddleware } = require("../middllewares/user");
const jwt=require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config");


const userRouter=Router();

userRouter.post("/signup", async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;

    await userModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        message:"signup endpoint"
    })
})

userRouter.post("/signin", async function(req,res){
    const {email,password}=req.body;

    const user=await userModel.findOne({
        email,
        password
    })

    if(user){
        const token =jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD)

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

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports={
    userRouter:userRouter
}