import BaseUser from '../models/user/baseUserModel'
import ArisError from '../models/arisErrorModel'
import User from '../models/user/userModel'
import Data from '../models/dataModel'
import auth from '../middlewares/auth'

import express, { Request, Response, Application } from 'express'
const route = express.Router()

route.post('/register', async (req: Request, res: Response) => {
  const { name, sur_name, email, password } = req.body
  const user_info = { name, sur_name, email, password }

  try {
    Data.validate(user_info, 'base_user_register')

    const user = new BaseUser(user_info)

    await user.insert()
    const access_token = user.generateAccessToken()

    return res.status(200).send({
      Success: true,
      Message: 'Registration complete!',
      user,
      access_token
    })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Registration')
    return res.status(result.status).send(result.send)
  }
})

route.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    Data.validate({ email, password }, 'user_login')

    const user = await User.getUser(email)
    const access_token = await user.login(password)

    return res.status(200).send({ Success: true, Message: 'Login authorized!', access_token })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Login')
    return res.status(result.status).send(result.send)
  }
})

route.get('/validate-session', auth, async (req: Request, res: Response) => {
  try {
    return res.status(200).send({ Success: true, Message: 'Session validated!' })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Validate session')
    return res.status(result.status).send(result.send)
  }
})

route.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body

  try {
    Data.validate({ email }, 'forgot_password')

    const ResetPasswordToken = await User.forgotPassword(<string>email)

    return res.status(200).send({ Success: true, Message: 'Email sended!', ResetPasswordToken })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Change password')
    return res.status(result.status).send(result.send)
  }
})

route.post('/reset-password', async (req: Request, res: Response) => {
  const { token, password } = req.body

  try {
    const result = await User.resetPassword(token, password)

    return res.status(200).send({ Success: true, Message: 'Password changed!', ...result })
  } catch (error) {
    const result = ArisError.errorHandler(error, 'Change password!')
    return res.status(result.status).send(result.send)
  }
})

export default (app: Application) => app.use('/', route)
