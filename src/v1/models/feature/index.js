import mongoose from './../../config/db'

import {
  CREATE_FEATURED_FAILED,
  REMOVE_FEATURED_FAILED,
  UPDATE_FEATURED_FAILED,
} from './../../config/messages'

const FeatureSchema = new mongoose.Schema(
  {
    shownSince: {
      type: Date,
      require: true,
    },
    imagePath: {
      type: String,
    },
    active: {
      type: Boolean,
      require: true,
    },
    novel: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Novel',
      require: true,
    },
  },
  {
    strict: true,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
)

export function featuredModel() {
  return mongoose.model('Feature', FeatureSchema)
}

const Feature = featuredModel()

export function create(data) {
  return new Feature(data)
    .save()
    .then(result => result)
    .catch((err) => {
      throw Object({
        message: CREATE_FEATURED_FAILED,
        status: 422,
        payload: err.name,
      })
    })
}

export function findAllActive() {
  return Feature.aggregate([
    { $match: { active: true } },
    {
      $lookup: {
        from: 'novels',
        localField: 'novel',
        foreignField: '_id',
        as: 'novel',
      },
    },
    {
      $project: {
        shownSince: 1,
        imagePath: 1,
        novel: {
          _id: 1,
          name: 1,
          cover_url: 1,
        },
      },
    },
  ])
    .then(payload => payload)
    .catch((err) => {
      throw new Error({
        payload: err,
        code: 500,
      })
    })
}

export function findByIdOrFindAll(featuredId, currentPage) {
  if (featuredId) {
    const { ObjectId } = mongoose.Types
    return Feature.findById(ObjectId(featuredId))
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

  return Feature.aggregate([
    { $match: { active: true } },
    {
      $lookup: {
        from: 'novels',
        localField: 'novel',
        foreignField: '_id',
        as: 'novel',
      },
    },
    {
      $project: {
        shownSince: 1,
        imagePath: 1,
        novel: {
          _id: 1,
          name: 1,
          cover_url: 1,
        },
      },
    },
  ])
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(result => (
      Feature
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

export function remove(featuredId) {
  const { ObjectId } = mongoose.Types

  return Feature.remove({ _id: ObjectId(featuredId) })
    .exec()
    .then(payload => payload)
    .catch((err) => {
      throw Object({
        message: REMOVE_FEATURED_FAILED,
        status: 422,
        payload: err,
      })
    })
}

export function update(body, featuredId) {
  const { ObjectId } = mongoose.Types

  return Feature.findOneAndUpdate(
    { _id: ObjectId(featuredId) },
    { $set: body },
    { new: true },
  )
    .then(payload => payload)
    .catch((err) => {
      throw new Error({
        message: UPDATE_FEATURED_FAILED,
        status: 422,
        payload: err,
      })
    })
}
