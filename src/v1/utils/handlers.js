/* eslint-disable import/prefer-default-export */
import * as messages from './../config/constants'

export function internalError(err, req, res, next) {
  next(res.status(err.status || 500).json({
    payload: err.payload ? {} : err,
    status: err.status || 500,
    message: err.message || messages.INTERNAL_ERROR,
  }))
}
