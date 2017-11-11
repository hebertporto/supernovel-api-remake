import mongoose from './../../config/db'

import {
  CREATE_CHAPTER_FAILED,
  REMOVE_CHAPTER_FAILED,
  UPDATE_CHAPTER_FAILED,
} from './../../config/messages'

const ChapterSchema = new mongoose.Schema({
  number: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  translators: {
    type: String,
    required: true,
  },
  revisors: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
  novel: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Novel',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export function chapterModel() {
  return mongoose.model('Chapter', ChapterSchema)
}

const Chapter = chapterModel()

export function create(data) {
  return new Chapter(data)
    .save()
    .then(result => result)
    .catch((err) => {
      throw Object({ message: CREATE_CHAPTER_FAILED, status: 422, payload: err })
    })
}

export function findByIdOrFindAll(chapterId, currentPage) {
  if (chapterId) {
    const { ObjectId } = mongoose.Types
    return Chapter.findById(ObjectId(chapterId))
      .then(result => result)
      .catch((err) => {
        throw new Error({ payload: err, code: 500 })
      })
  }
  const perPage = 2
  const page = currentPage || 1

  return Chapter.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(result => (
      Chapter
        .count()
        .then(contResult => ({
          chapters: result,
          currentPage: page,
          pages: Math.ceil(contResult / perPage),
        }))
        .catch((err) => {
          throw new Error({ payload: err, code: 500 })
        })
    ))
    .catch((err) => {
      throw new Error({ payload: err, code: 500 })
    })
}

export function findByChapterId(chapterId) {
  const { ObjectId } = mongoose.Types
  return Chapter.findById(ObjectId(chapterId))
    .then(result => result)
    .catch((err) => {
      throw new Error({ payload: err, code: 500 })
    })
}

export function findByNovel(novelId, currentPage) {
  const perPage = 10
  const page = currentPage || 1
  const { ObjectId } = mongoose.Types

  return Chapter.find({ novel: ObjectId(novelId) })
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(result => (
      Chapter
        .count()
        .then(contResult => ({
          chapters: result,
          currentPage: page,
          pages: Math.ceil(contResult / perPage),
        }))
        .catch((err) => {
          throw new Error({ payload: err, code: 500 })
        })
    ))
    .catch((err) => {
      throw new Error({ payload: err, code: 500 })
    })
}

export function remove(chapterId) {
  const { ObjectId } = mongoose.Types

  return Chapter.remove({ _id: ObjectId(chapterId) })
    .exec()
    .then(payload => payload)
    .catch((err) => {
      throw Object({ message: REMOVE_CHAPTER_FAILED, status: 422, payload: err })
    })
}

export function update(body, chapterId) {
  const { ObjectId } = mongoose.Types

  return Chapter.findOneAndUpdate(
    { _id: ObjectId(chapterId) },
    { $set: body },
    { new: true },
  )
    .then(payload => payload)
    .catch((err) => {
      throw new Error({
        message: UPDATE_CHAPTER_FAILED,
        status: 422,
        payload: err,
      })
    })
}
