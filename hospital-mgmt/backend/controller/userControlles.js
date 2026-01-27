import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/errorMiddleware.js';
import User from '../models/model.userSchema.js';
import {generateToken} from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const{firstName, lastName, email, phone, nic, dob, gender, password, role} = req.body;

    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role){
        return next(new ErrorHandler('Please enter all required fields', 400));
    }

    let  user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler('User already exists with this email', 400));
    }
    user = await User.create({firstName, lastName, email, phone, nic, dob, gender, password, role})

    generateToken(user, 'Registration successful', 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
    }

    const user = await User.findOne({email}).select('+password')
    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 400));
    }

    // const isPasswordMatched = await bcrtpt.compare(password, user.password);
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password', 400));
    }

    if(user.role !== role){
        return next(new ErrorHandler('Unauthorized access for this role', 403));
    }

    generateToken(user, `Welcome back, ${user.firstName}`, 200, res); 
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const{firstName, lastName, email, phone, nic, dob, gender, password} = req.body;

    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password ){
        return next(new ErrorHandler('Please enter all required fields', 400));
    }

    const isAlreadyRegistered = await User.findOne({email})

    if (isAlreadyRegistered){
        return next(new ErrorHandler('User already exists with this email', 400));
    }

    const admin = await User.create({firstName, lastName, email, phone, nic, dob, gender, password, role: 'Admin'});
   
    res.status(201).json({
        success: true,
        message: 'New admin added successfully',
        admin,
    });

});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({role: 'Doctor'});

    res.status(200).json({
        success: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logOutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie('admin_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
});
});

export const logOutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie('patient_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if(!req.files || Object.keys.length === 0) {
        return next(new ErrorHandler('Please upload doctor avatar', 400));
    }

    const docAvatar = req.files.docAvatar;
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler('Only jpg, jpeg, png, webp formats are allowed for avatar', 400));
    }

    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;

    if(!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment){
        return next(new ErrorHandler('Please enter all required fields', 400));
    }

    const isAlreadyRegistered = await User.gindOne({email});

    if( isAlreadyRegistered){
        return next(new ErrorHandler(`${isAlreadyRegistered.role} already exists with this email  `, 400));
    }

    const cloudinaryRes = await cloudinary.Uploader.upload(
        docAvatar.tempFilePath,
    )

    if(!cloudinaryRes || cloudinaryRes.error){
        console.error(cloudinaryRes.error || 'Cloudinary upload error');
        
        return next(new ErrorHandler('Avatar upload failed, please try again', 500));
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: 'Doctor', 
        doctorDepartment,
        docAvatar: {
            public_id: cloudinaryRes.public_id,
            url: cloudinaryRes.secure_url,
        },
    })

    res.status(201).json({
        success: true,
        message: 'New doctor added successfully',
        doctor,
    });

} );