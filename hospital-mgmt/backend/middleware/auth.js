import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/errorMiddleware.js';
import jwt from 'jsonwebtoken';
import User from '../models/model.userSchema.js';

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.admin_token

    if(!token){
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if(req.user.role !== 'Admin'){
        return next(new ErrorHandler('Unauthorized access', 403));
    }

    next();

});

export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patient_token

    if(!token){
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if(req.user.role !== 'Patient'){
        return next(new ErrorHandler('Unauthorized access', 403));
    }
    next();
});