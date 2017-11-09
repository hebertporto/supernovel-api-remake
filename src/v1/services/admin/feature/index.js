import express from 'express'
import validate from 'express-validation'

import { createFeatureSchema } from './schema'

import {
  create,
  findAll,
  remove,
  update,
} from './../../../models/feature'

const router = express.Router()

router.post('/', validate(createFeatureSchema), ({ body }, res, next) => {
  create(body)
    .then(payload => res.status(201).json(payload))
    .catch(error => next(error))
})

router.get('/:featureId?', ({ params, query }, res, next) => {
  const { featureId } = params
  const { currentPage } = query
  findAll(featureId, currentPage)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.delete('/featureId', ({ params }, res, next) => {
  const { featureId } = params
  remove(featureId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.put('/:featureId', ({ body, params }, res, next) => {
  const { featureId } = params

  update(body, featureId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

export default router
