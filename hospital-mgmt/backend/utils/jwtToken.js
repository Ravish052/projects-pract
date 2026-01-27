export const generateToken = (user, message, statuscode, res) => {
    const token = user.generateJwt();
    const cookieName = user.role === 'Admin' ? 'admin_token' : 'patient_token';

    res.status(statuscode).cookie(cookieName, token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    }).json({
        success: true,
        message,
        user, token
    })
};