import express from 'express'
import { getUsers, login, blockUser } from '../controllers/admin.js'


const router = express.Router()

router.post('/login',login)
router.get('/getAllUsers', getUsers)
router.put("/blockUser/:id",blockUser)

export default router