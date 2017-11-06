import express from 'express'

import { findByIdOrFindAll } from './../../../models/novel'

const router = express.Router()

router.get('/:novelId?', ({ params, query }, res, next) => {
  const { novelId } = params
  const { currentPage } = query
  findByIdOrFindAll(novelId, currentPage)
    .then(payload => res.status(200).json({ payload }))
    .catch(error => next(error))
})

export default router
