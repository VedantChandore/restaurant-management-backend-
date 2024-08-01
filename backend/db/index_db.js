const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://vedantchandore5:pxBCPIWfF4RbOP65@clusterdemo.fox0wsn.mongodb.net/restaurant_app")

//admin schema
const admin_schema=new mongoose.Schema({
    username:String,
    password:String,
    restaurant_name:String
})

//user schema
const user_schema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

//items schema
const items_schema=new mongoose.Schema({
    itemName:String,
    itemType:String,
    itemPrice:Number
})

//orders schema
const orders_schema=new mongoose.Schema({
    orderName:String,
    orderType:String,
    orderPrice:Number

})

const Admin=mongoose.model("Admin",admin_schema)
const User=mongoose.model("User",user_schema)
const Items=mongoose.model("Items",items_schema)
const Orders=mongoose.model("Orders",orders_schema)


module.exports=({
    Admin,
    User,
    Items,
    Orders

})