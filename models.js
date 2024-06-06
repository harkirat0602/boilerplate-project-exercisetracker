const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
})

const User = mongoose.model('User',userSchema)


const exerciseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    }
})

const Exercise = mongoose.model("Exercise",exerciseSchema)


// const logSchema = mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     count: Number,
//     log:[
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref:'Exercise'
//         }
//     ]
// })

// const Log= mongoose.model('Log',logSchema)


module.exports= {Exercise,User}