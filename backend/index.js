const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const zod = require("zod")
const JWT_SECRET = "token123"
const { Admin, User, Items, Orders } = require("./db/index_db")
const adminMiddleware = require("./middlewares/admin_middleware")
const userMiddleware = require("./middlewares/user_middleware")
const { MongoUnexpectedServerResponseError } = require("mongodb")
const app = express()

app.use(bodyParser.json())

const port = 8000

const validation_schema = zod.object({
    username: zod.string().max(16),
    password: zod.string().min(6).max(10),
    email: zod.string().email(),
    restaurant_name: zod.string()
})


/* ADMIN ROUTES */

//sign-up
app.post("/admin/signup", async function (req, res) {
    const response = validation_schema.safeParse(req.body)
    if (!response.success) {
        res.json({
            error: "invalid data"
        })
    }
    else {
        const username = req.body.username
        const password = req.body.password
        const restaurant_name = req.body.restaurant_name

        const admin = await Admin.create({
            username,
            password,
            restaurant_name
        })

        if (admin) {
            res.json({
                msg: "Admin registered successfully"
            })
        }
        else {
            res.json({
                error: "Admin not registered"
            })
        }
    }
})
//sign in
app.post("/admin/signin", async function (req, res) {
    const username = req.body.username
    const password = req.body.password

    const existingAdmin = await Admin.findOne({ username: username, password: password })

    if (existingAdmin) {
        const token = jwt.sign({ username }, JWT_SECRET)
        res.json({
            jwt_token: token
        })
    }
    else {
        res.status(403).json({
            error: "admin not found"
        })
    }

})
//menu creation
app.post("/admin/menu", adminMiddleware, async function (req, res) {
    const itemName = req.body.itemName
    const itemType = req.body.itemType
    const itemPrice = req.body.itemPrice

    await Items.create({
        itemName,
        itemType,
        itemPrice
    })
    res.status(200).json({
        msg: "Menu updated successfully..!"
    })
})
//menu display
app.get("/admin/menu", adminMiddleware, async function (req, res) {
    const menu = await Items.find({})
    res.json({
        menu: menu
    })

})


/* USER ROUTES */

//signup
app.post("/user/signup", async function (req, res) {
    const response = validation_schema.safeParse(req.body)
    if (!response.success) {
        res.json({
            error: "invalid data"
        })
    }
    else {


        const username = req.body.username
        const password = req.body.password
        const email = req.body.email

        const user = await User.create({
            username,
            password,
            email
        })
        if (user) {
            res.json({
                msg: "User registered successfully"
            })
        }
        else {
            res.json({
                error: "User not registered"
            })
        }
    }
})
//signin
app.post("/user/signin", async function (req, res) {
    const username = req.body.username
    const password = req.body.password

    const isUserExists = await User.findOne({ username: username, password: password })
    if (isUserExists) {
        const token = jwt.sign({ username }, JWT_SECRET)
        res.json({
            token: token
        })
    }
    else {
        res.json({
            error: "Authentication failed"
        })
    }
})
//view menu
app.get("/user/menu", userMiddleware, async function (req, res) {
    const menu = await Items.find({})
    res.json({
        menu: menu
    })
})
//order food
app.post("/user/order", userMiddleware, async function (req, res) {
    const itemName = req.body.itemName
    const item = await Items.findOne({ itemName: itemName })

    if (!item) {
        res.json({
            error: "Item not available in menu"
        })
    }
    else {
        const new_order = await Orders.create({
            orderName: item.itemName,
            orderType: item.itemType,
            orderPrice: item.itemPrice
        })
        res.status(200).send("Order placed successfully").json({
            order: new_order
        })

    }
})
//rating 
app.post("/user/rate/:rating",userMiddleware,function(req,res){
    const rating=parseInt(req.params.rating,10)

    if(rating==5){
        res.send("Wow..!,Glad to know that your experience was amazing")
    }
    else if(rating==4){
        res.send("Yummy Meal Know..!,Do visit again")
    }
    else if(rating==3){
        res.send("Look like you haven't enjoyed much...Will try to improve")
    }
    else if(rating<=1 && rating>=2){
        res.send("Oops..! Sorry for the service, We promise next time will give it us a 5 star")
    }


})

app.listen(port)
