const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add user name"]
    },
    email: {
        type: String, 
        required: [true, "Please add email address"],
        unique: [true, "email already exit"],
    },
    password: {
        type: String,
        required: [true, "please add password"],
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("user", userSchema);