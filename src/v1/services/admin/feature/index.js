import express from 'express'
import validate from 'express-validation'
import { upload } from './../../../utils/upload'

import { createFeatureSchema } from './schema'

import {
  create,
  findByIdOrFindAll,
  remove,
  update,
} from './../../../models/feature'

const router = express.Router()

router.post('/', upload.single('file'), validate(createFeatureSchema), ({ body, file }, res, next) => {
  create(body, file)
    .then(payload => res.status(201).json(payload))
    .catch(error => next(error))
})

router.get('/:featureId?', ({ params, query }, res, next) => {
  const { featureId } = params
  const { currentPage } = query
  findByIdOrFindAll(featureId, currentPage)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.delete('/:featureId', ({ params }, res, next) => {
  const { featureId } = params
  remove(featureId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.put('/:featureId', upload.single('file'), ({ body, params, file }, res, next) => {
  const { featureId } = params
  update(body, featureId, file)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

export default router
