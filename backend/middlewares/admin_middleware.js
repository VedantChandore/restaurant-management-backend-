//authenticating admin here
const jwt=require("jsonwebtoken")
const JWT_SECRET="token123"

function adminMiddleware(req,res,next){
    const token=req.headers.authorization
    const decode=jwt.verify(token,JWT_SECRET)

    if(decode){
       next()
    }
    else{
        res.status(200).json({
            warning:"wrong token"
        })
    }
}
module.exports=adminMiddleware