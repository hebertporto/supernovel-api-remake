import express from 'express'
import validate from 'express-validation'

import { createNovelSchema } from './schema'

import {
  create,
  findByIdOrFindAll,
  remove,
  update,
} from './../../../models/novel'

const router = express.Router()

router.post('/', validate(createNovelSchema), ({ body }, res, next) => {
  create(body)
    .then(payload => res.status(201).json({ payload }))
    .catch(error => next(error))
})

router.get('/:novelId?', ({ params, query }, res, next) => {
  const { novelId } = params
  const { currentPage } = query
  findByIdOrFindAll(novelId, currentPage)
    .then(payload => res.status(200).json({ payload }))
    .catch(error => next(error))
})

router.delete('/novelId', ({ params }, res, next) => {
  const { novelId } = params
  remove(novelId)
    .then(payload => res.status(200).json({ payload }))
    .catch(error => next(error))
})

router.put('/:novelId', ({ body, params }, res, next) => {
  const { novelId } = params

  update(body, novelId)
    .then(payload => res.status(200).json({ payload }))
    .catch(error => next(error))
})

export default router
