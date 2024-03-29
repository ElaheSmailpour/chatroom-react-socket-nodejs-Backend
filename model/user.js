const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        default: 0
    }

})
const User = mongoose.model("chatUser", userSchema);
module.exports = User;