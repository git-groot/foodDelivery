const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    menuName:{type:String},
    description:{type:String},
    bestPrice:{type:Number},
    quantity:{type:Number},
    discount:{type:Number},
    discountType:{type:String},
    categories:{type:String},
    image:{type:String},
    status:{type:String},
    sellerId:{type:String},
});

module.exports=mongoose.model("menuItem",menuSchema);