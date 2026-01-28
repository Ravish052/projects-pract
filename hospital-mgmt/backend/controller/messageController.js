import { Message } from '../models/model.messagSchema.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/errorMiddleware.js';

export const sendMessage = catchAsyncErrors(
    async (req, resizeBy, next) => {
        const { firstName, lastName, email, phone, message } = req.body;
        if (!firstName || !lastName || !email || !phone || !message) {
            // return next(new Error("All fields are required", 400));
            return next(new ErrorHandler("All fields are required", 400));
        }

        await Message.create({ firstName, lastName, email, phone, message });
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        })
    }
)

export const getAllMessages = catchAsyncErrors(
    async(req, res, next) => {
        const messages = await Message.find();
        res.status(200).json({
            success: true,
            messages,
        })
    }
)
