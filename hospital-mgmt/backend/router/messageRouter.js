import express from 'express'
import { sendMessage } from '../controller/messageController.js'
import { isAdminAuthenticated } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/send', (req, res) => {
    sendMessage(req, res)
})

router.get('/getAll', isAdminAuthenticated, getAllMessages)

export default router