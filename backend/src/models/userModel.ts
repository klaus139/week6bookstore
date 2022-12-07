import mongoose, {Schema} from 'mongoose';

export interface UserAttribute {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    verified: boolean;
    role: string;
}

const UserSchema = new Schema(
    {
        name:{type: String, required: true},
        email:{type: String, required: true, unique: true},
        phone:{type: String, required: true},
        password:{type: String, required: true},
        verified:{type: Boolean},
        role:{type: String, required: true}

    },
    {
        timestamps: true
    }
)

export const User = mongoose.model<UserAttribute>('User', UserSchema);

