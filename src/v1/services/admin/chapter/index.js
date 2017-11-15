import express from 'express'
import validate from 'express-validation'

import { createChapterSchema } from './schema'

import {
  create,
  findByIdOrFindAll,
  remove,
  update,
} from './../../../models/chapter'

const router = express.Router()

router.post('/', validate(createChapterSchema), ({ body }, res, next) => {
  create(body)
    .then(payload => res.status(201).json(payload))
    .catch(error => next(error))
})

router.get('/:chapterId?', ({ params }, res, next) => {
  const { chapterId } = params
  findByIdOrFindAll(chapterId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.delete('/:chapterId', ({ params }, res, next) => {
  const { chapterId } = params
  remove(chapterId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.put('/:chapterId', ({ body, params }, res, next) => {
  const { chapterId } = params

  update(body, chapterId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

export default router
