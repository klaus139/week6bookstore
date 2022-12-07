import mongoose, {Schema} from 'mongoose';

export interface BookAttribute {
    _id: string;
    title: string;
    description: string;
    author: string;
    price: number;
    category: string;
    image: string;
}

const BookSchema = new Schema(
    {
        title:{type: String, required: true},
        description:{type: String, required: true},
        author:{type: String, required: true},
        price:{type: Number, required: true},
        category:{type: String, required: true},
        image:{type: String}
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model<BookAttribute>('Book', BookSchema);