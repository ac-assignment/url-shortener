import express from 'express'
import home from './modules/home.js'
const router = express.Router()

router.use('/', home)

export default router