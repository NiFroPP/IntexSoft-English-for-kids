import { body } from 'express-validator'
import { Router } from 'express'
import UserController from './user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post(
  '/registration',
  body('username').isLength({ min: 1 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 12 }),
  UserController.registration
)
router.post('/login', UserController.login)
router.get('/all', authMiddleware, UserController.getAllUsers)

export = router
