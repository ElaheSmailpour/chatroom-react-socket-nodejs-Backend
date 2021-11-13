const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    message: {
        type: String
    },
    gender: {
        type: String
    },
    receiver: {
        type: String
    },
    time: {
        type: String
    },
    isRead: {
        type: Boolean,
        default: false
    },
    edited: {
        type: Boolean,
        default: false
    },

    type: {
        type: String,
        default: "msg"
    },
})

module.exports = mongoose.model("messageUser", messageSchema);