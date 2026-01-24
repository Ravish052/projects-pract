import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: [2, "First Name must be at least 2 characters long"],
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        minlength: [2, "Last Name must be at least 2 characters long"],
        required: [true, "Last Name is required"],
    },
    email:{
        type: String,
        validate: [validator.isEmail, "Please enter a valid email address"],
        required: [true, "Email is required"],
    },
    phone:{
        type: String,
        required: [true, "Phone is required"],
        minlength: [10, "Phone number must be at least 10 digits long"],
        maxlength: [11, "Phone number must be at most 15 digits long"],
    },
    message:{
        type: String,
        required: [true, "message is required"],
        minlength: [10, "message must be at least 10 characters long"],
        maxlength: [200, "message must be at most 200 characters long"],
    }
})

export const Message = mongoose.model("Message", messageSchema)