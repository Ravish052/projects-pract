import express from 'express';
import { patientRegister, login, addNewAdmin, getAllDoctors } from '../controller/userControlles.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/patient/register', patientRegister);
router.post('/login', login);
router.post('/admin/addNew', isAdminAuthenticated, addNewAdmin);
router.get('/doctors', getAllDoctors);
router.get('/admin/me', isAdminAuthenticated, getAdminDetails);
router.get('/patient/me',isPatientAuthenticated, getUserDetails);
router.get('/admin/logout', isAdminAuthenticated, logout);
router.get('/patient/logout', isPatientAuthenticated, logout);
router.post('/doctor/addNew', isAdminAuthenticated, addNewDoctor);

export default router;