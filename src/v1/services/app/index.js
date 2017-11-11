import express from 'express'

import { findByIdOrFindAll } from './../../models/novel'
import { findAllActive } from './../../models/feature'
import { findByNovel, findByChapterId } from './../../models/chapter'

const router = express.Router()

router.get('/featureNovels', (req, res, next) => {
  findAllActive()
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.get('/novels/:novelId?', ({ params, query }, res, next) => {
  const { novelId } = params
  const { currentPage } = query
  findByIdOrFindAll(novelId, currentPage)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.get('/chapters/byNovel/:novelId', ({ params }, res, next) => {
  const { novelId } = params
  findByNovel(novelId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

router.get('/chapters/:chapterId', ({ params }, res, next) => {
  const { chapterId } = params
  findByChapterId(chapterId)
    .then(payload => res.status(200).json(payload))
    .catch(error => next(error))
})

export default router
