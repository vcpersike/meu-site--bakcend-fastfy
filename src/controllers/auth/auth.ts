import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'
import Usuario from '../../models/usuarioModel'

const { ACCESS_TOKEN_SECRET }: any = process.env

export class AuthController {
    public login(req: Request, res: Response): void {
        // check email and password
        // retrieve user object from database
        // jwt sign with access token
        // respond with user and token
        try {
            const user: Usuario = req.body.user
            const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET)
            console.log(user)
            res.json({ user, accessToken: accessToken })
        } catch (error) {
            res.send(400).json({ error: error })
        }
    }
}