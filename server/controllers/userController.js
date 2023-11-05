const ApiError = require('../error/ApiError')



const { User, Basket } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role)=>{
    return jwt.sign({id, email, role}, 
        process.env.SECRET_KEY,
         {expiresIn : "24h"})
}

class UserController {
    async registration(req, res, next){

    const { email, password, role } = req.body

    if (!email && !password) {
       return next(ApiError.badRequest( "Email yoki Password noto'g'ri"))
    }
    const condidate = await User.findOne({where:{email}})

    if (condidate) {
        return next(ApiError.badRequest( "Bu email allaqachon ro'yxatdan o'tgan"))
    }
    const hashPas  =  await bcrypt.hash(password, 5)

    const user = await User.create({email,role, password:hashPas})
    const basket = await Basket.create({userId: user.id})
    const token = generateJwt(user.id, user.email, user.role)

         return res.json({token})
}
async login(req, res, next){  

    const { email, password } = req.body
    const user = await User.findOne({where:{email}})

    if (!user) {
        return next(ApiError.internal("Bunday User mavjud emas!"))
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        return next(ApiError.internal("Siz noto'g'ri parol kiritdingiz!"))
    }

    const token = generateJwt(user.id, user.email, user.role)

    return res.json({token})

}
async check(req, res, next){
    
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
}


}
module.exports = new UserController() 