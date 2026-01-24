import express from 'express'
import { sendMessage } from '../controller/messageController.js'

const router = express.Router()

router.post('/send', (req, res) => {
    sendMessage(req, res)
})

export default router