import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'writer', 'admin'],
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    collegeId: {
        type: String,
        required: true,
    }
})



export default mongoose.model('User', userSchema);