import expres from 'express';
import { postAppointment } from '../controller/appointmentController.js';
import { isPatientAuthenticated , isAdminAuthenticated} from '../middleware/auth.js';

const router = expres.Router();

router.post('/post', isPatientAuthenticated, postAppointment)
router.get('/get', isAdminAuthenticated, getAppointments)
router.put('/update/:id', isAdminAuthenticated, updateAppointmentStatus)
router.delete('/delete/:id', isAdminAuthenticated, deleteAppointment)

export default router;