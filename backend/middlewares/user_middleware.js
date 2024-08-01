//authenticating user here
const jwt=require("jsonwebtoken")
const JWT_SECRET="token123"

function userMiddleware(req,res,next){
    const token=req.headers.authorization
    const decode=jwt.verify(token,JWT_SECRET)

    if(decode){
        next()
    }
    else{
        res.json({
            warning:"wrong token"
        })
    }
}

module.exports=userMiddleware