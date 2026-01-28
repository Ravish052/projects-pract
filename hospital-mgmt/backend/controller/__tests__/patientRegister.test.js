import { patientRegister } from '../userControlles.js';
import User from '../../models/model.userSchema.js';
import { generateToken } from '../../utils/jwtToken.js';
import ErrorHandler from '../../middleware/errorMiddleware.js';

// Mock dependencies
jest.mock('../../models/model.userSchema.js');
jest.mock('../../utils/jwtToken.js');

describe('patientRegister', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '1234567890',
                nic: 'NIC123456',
                dob: '1990-01-01',
                gender: 'Male',
                password: 'password123',
                role: 'Patient',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn().mockReturnThis(),
        };

        next = jest.fn();

        jest.clearAllMocks();
    });

    describe('Validation', () => {
        it('should return error if firstName is missing', async () => {
            delete req.body.firstName;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if lastName is missing', async () => {
            delete req.body.lastName;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if email is missing', async () => {
            delete req.body.email;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if phone is missing', async () => {
            delete req.body.phone;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if nic is missing', async () => {
            delete req.body.nic;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if dob is missing', async () => {
            delete req.body.dob;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if gender is missing', async () => {
            delete req.body.gender;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if password is missing', async () => {
            delete req.body.password;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });

        it('should return error if role is missing', async () => {
            delete req.body.role;

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Please enter all required fields',
                    statusCode: 400,
                })
            );
        });
    });

    describe('User existence check', () => {
        it('should return error if user already exists with the email', async () => {
            const existingUser = { ...req.body };
            User.findOne.mockResolvedValue(existingUser);

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'User already exists with this email',
                    statusCode: 400,
                })
            );
        });
    });

    describe('User creation', () => {
        it('should successfully create a new user and generate token', async () => {
            const newUser = { ...req.body, _id: '123456' };
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue(newUser);

            await patientRegister(req, res, next);

            expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
            expect(User.create).toHaveBeenCalledWith({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                nic: req.body.nic,
                dob: req.body.dob,
                gender: req.body.gender,
                password: req.body.password,
                role: req.body.role,
            });
            expect(generateToken).toHaveBeenCalledWith(
                newUser,
                'Registration successful',
                201,
                res
            );
        });

        it('should not call generateToken if user creation fails', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockRejectedValue(new Error('Database error'));

            await patientRegister(req, res, next);

            expect(generateToken).not.toHaveBeenCalled();
        });
    });

    describe('Error handling', () => {
        it('should handle database errors', async () => {
            User.findOne.mockRejectedValue(new Error('Database connection failed'));

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
        });

        it('should handle creation errors', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockRejectedValue(new Error('Validation error'));

            await patientRegister(req, res, next);

            expect(next).toHaveBeenCalled();
        });
    });
});
