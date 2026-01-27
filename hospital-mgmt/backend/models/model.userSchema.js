import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        validate: [validator.isEmail, "Please enter a valid email address"],
        required: [true, "Email is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        minlength: [10, "Phone number must be at least 10 digits long"],
        maxlength: [11, "Phone number must be at most 11 digits long"],
    },
    nic: {
        type: String,
        required: [true, "NIC is required"],
        minlength: [10, "NIC must be at least 10 digits long"],
        maxlength: [11, "NIC must be at most 15 digits long"],
    },

    dob: {
        type: Date,
        required: [true, "Date of Birth is required"],
    },

    gender : {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, "Gender is required"],
    },

    password : {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select : false,
    },

    role : {
        type: String,
        enum: ['Admin', 'Doctor', 'Patient'],
        default: 'patient',
    },

    doctorDepartment : {
        type: String,
    },

    docAvatar : {
        public_id: String,
        url: String
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }else{
        // Hash password before saving
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJwt = function() {
    return jwt.sign(
        {
            id: this._id,
        }, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
}

const User = mongoose.model("User", userSchema);
export default User;