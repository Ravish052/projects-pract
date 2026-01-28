import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, "Gender is required"],
    },

    appointMentDate: {
        type: Date,
        required: [true, "Appointment Date is required"],
        department: {
            type: String,
            required: [true, "Department is required"],
        },
    },

    doctor: {
        firstName: {
            type: String,
            minlength: [2, "First Name must be at least 2 characters long"],
        }, lastName: {
            type: String,
            minlength: [2, "Last Name must be at least 2 characters long"],
        }
    },

    hasVisited : {
        type : Boolean,
        //required : [true, "Has Visited field is required"],
        default : false,
    },

    doctor_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "Doctor ID is required"],
    },
    patient_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "Patient ID is required"],
    },

    status : {
        type : String,
        enum : ['Pending', 'Accepted', 'Rejected'],
        default : 'Pending',
    }
})

export const Appointment = mongoose.model("Appointment", appointmentSchema);