import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';
//import { APP_SECRET } from '../config/index';
import dotenv from 'dotenv';
dotenv.config();


/**============Register a user===========**/
export const registerSchema = Joi.object().keys({
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('confirm password').messages({ 'any.only': '{{#label}} does not match' })
})

/**============ Update user Schema ===========**/
export const updateSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),

})

/**============ Admin Schema ===========**/
export const adminSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

/**============ Login Schema ===========**/
export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})

/**============ Register Schema ===========**/
export const authorSchema = Joi.object().keys({
    name: Joi.string().required(),
    bookName: Joi.string().required(),
    pincode: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

/**============ Book Schema ===========**/
export const bookSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    cover: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
});

/**============ Update Book Schema ===========**/
export const updateBookSchema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    author: Joi.string(),
    cover: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
});

export const option = {
    abortEarly: false,
    errors:{
        wrap:{
            label: ''
        }
    }
}

export const GenerateSalt = async() => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async(password:string, salt:string)=> {
    return await bcrypt.hash(password, salt)
}

export const GenerateSignature = async(payload:JwtPayload)=>{
    return jwt.sign(payload, process.env.APP_SECRET!,{expiresIn: '1d'});
}

export const verifiySignature = async(signature: string) => {
    return jwt.verify(signature, process.env.APP_SECRET!);
}

export const GenerateToken = async(payload:JwtPayload)=>{
    return jwt.sign(payload, process.env.APP_SECRET!);
}

export const VerifyToken = async(token: string)=>{
    return jwt.verify(token, process.env.APP_SECRET!);
}

/**============ Validate Password ===========**/
export const validatePassword = async (enteredPassword:string, savedPassword:string, salt:string) => {
    //return await bcrypt.compare(enteredPassword, savedPassword);
    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

/**============ Validate Email ===========**/
export const validateEmail = (email:string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

