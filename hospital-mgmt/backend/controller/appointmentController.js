import { catchAsyncErrors } from '../middleware/catchAsyncErrors'
import ErrorHandler from '../middleware/errorHandler.js'

import { Appointment } from '../models/model.appointmentSchema.js'
import { User } from '../models/model.userSchema.js'

const postAppountment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointMentDate,
        department,
        doctorFirstName,
        doctorLastName,
        hasVisited,
        address
    } = req.body

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointMentDate || !department || !doctorFirstName || !doctorLastName || !hasVisited || !address) {
        return next(new ErrorHandler('Please enter all required fields', 400))
    }

    const isConflict = await User.find({
        firstName: doctorFirstName,
        lastName: doctorLastName,
        department: department,
        role: 'doctor'
    })

    if (isConflict.length === 0) {
        return next(new ErrorHandler('No doctor found with the given details', 404))
    }

    if (isConflict.length > 1) {
        return next(new ErrorHandler('Multiple doctors found with the given details, please contact admin', 404))
    }

    const patient_id = req.user.id
    const doctor_id = isConflict[0]._id

    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointMentDate,
        department,
        doctor: {
            firstName: doctorFirstName,
            lastName: doctorLastName
        },
        hasVisited,
        address,
        patient_id,
        doctor_id
    })

    re.status(201).json({
        success: true,
        appointment,
        message: 'Appointment created successfully'
    })

});