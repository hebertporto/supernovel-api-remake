import mongoose from './../../config/db'

import {
  CREATE_NOVEL_FAILED,
  REMOVE_NOVEL_FAILED,
  UPDATE_NOVEL_FAILED,
} from './../../config/messages'

const NovelSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  translation_team: {
    type: String,
    required: true,
  },
  cover_url: {
    type: String,
    require: true,
  },
  date_start: {
    type: Date,
  },
  date_end: {
    type: Date,
  },
  users: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export function novelModel() {
  return mongoose.model('Novel', NovelSchema)
}

const Novel = novelModel()

export function create(data) {
  return new Novel(data)
    .save()
    .then(result => result)
    .catch((err) => {
      throw Object({
        message: CREATE_NOVEL_FAILED,
        status: 422,
        payload: err.name,
      })
    })
}

export function findWithoutPagination() {
  return Novel.find({})
    .then(payload => payload)
    .catch((err) => {
      throw new Error({
        payload: err,
        code: 500,
      })
    })
}

export function findByIdOrFindAll(novelId, currentPage) {
  if (novelId) {
    const { ObjectId } = mongoose.Types
    return Novel.findById(ObjectId(novelId))
      .then(result => result)
      .catch((err) => {
        throw new Error({
          payload: err,
          code: 500,
        })
      })
  }
  const perPage = 20
  const page = currentPage || 1

  return Novel.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(result => (
      Novel
        .count()
        .then(contResult => ({
          novels: result,
          currentPage: page,
          pages: Math.ceil(contResult / perPage),
        }))
        .catch((err) => {
          throw new Error({
            payload: err,
            code: 500,
          })
        })
    ))
    .catch((err) => {
      throw new Error({
        payload: err,
        code: 500,
      })
    })
}

export function remove(novelId) {
  const { ObjectId } = mongoose.Types

  return Novel.remove({ _id: ObjectId(novelId) })
    .exec()
    .then(payload => payload)
    .catch((err) => {
      throw Object({
        message: REMOVE_NOVEL_FAILED,
        status: 422,
        payload: err,
      })
    })
}

export function update(body, novelId) {
  const { ObjectId } = mongoose.Types

  return Novel.findOneAndUpdate(
    { _id: ObjectId(novelId) },
    { $set: body },
    { new: true },
  )
    .then(payload => payload)
    .catch((err) => {
      throw new Error({
        message: UPDATE_NOVEL_FAILED,
        status: 422,
        payload: err,
      })
    })
}
