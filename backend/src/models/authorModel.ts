import mongoose, {Schema} from 'mongoose';

export interface AuthorAttribute {
    _id: string;
    name: string;
    bookName: string;
    pincode:string;
    email: string;
    phone: string;
    password: string;
    salt: string;
    role: string;
    rating: number;
}

const AuthorSchema = new Schema(
    {
        name:{type: String, required: true},
        bookName:{type: String, required: true},
        pincode:{type: String},
        email:{type: String, required: true, unique: true},
        phone:{type: String, required: true},
        password:{type: String, required: true},
        salt:{type: String, required: true},
        role:{type: String},
        rating:{type: Number}
    },
    {
        timestamps: true
    }
)

export const Author = mongoose.model<AuthorAttribute>('Author', AuthorSchema);

