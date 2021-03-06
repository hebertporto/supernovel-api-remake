import express from 'express'
import validate from 'express-validation'
import { upload } from './../../../utils/upload'

import { createNovelSchema } from './schema'

import {
  create,
  findByIdOrFindAll,
  remove,
  update,
} from './../../../models/novel'

const router = express.Router()

router.post('/', upload.single('file'), validate(createNovelSchema), ({ body, file }, res, next) => {
  create(body, file)
    .then(payload => res.status(201).json(payload))
    .catch(error => next(error))
})

router.get('/:novelId?', ({ params, query }, res, next) => {
  const { novelId } = params
  const { currentPage } = query
  findByIdOrFindAll(novelId, currentPage)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.delete('/:novelId', ({ params }, res, next) => {
  const { novelId } = params
  remove(novelId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.put('/:novelId', upload.single('file'), ({ body, params, file }, res, next) => {
  const { novelId } = params

  update(body, novelId, file)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

export default router
