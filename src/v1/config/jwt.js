import jwt from 'jsonwebtoken'
import unless from 'express-unless'
import * as firebaseMiddleware from 'express-firebase-middleware'

import * as User from './../models/user'

const secret = process.env.SECRET || 'secret'

export const decodeJWT = firebaseMiddleware.auth

decodeJWT.unless = unless

export function encode(data) {
  return jwt.sign(data, secret)
}

export async function hydrateUser(req, res, next) {
  try {
    if (!req.user) {
      throw Object('Token is either missing or invalid')
    }
    const { _id } = req.user

    // Search for an user
    const user = await User.getUserById(_id)
    if (user) {
      return next()
    }
    throw Object('Invalid token')
  } catch (e) {
    return next(e)
  }
}

hydrateUser.unless = unless
