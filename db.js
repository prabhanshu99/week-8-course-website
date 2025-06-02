const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userschema = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,
})

const adminschema = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,
})

const courseschema = new Schema({
    title:String,
    descrption:String,
    imageUrl:String,
    price:String,
    creatorId:ObjectId,
})

const purchaseschema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
