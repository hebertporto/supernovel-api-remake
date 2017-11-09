import mongoose from './../../config/db'

import {
  CREATE_FEATURED_FAILED,
  REMOVE_FEATURED_FAILED,
  UPDATE_FEATURED_FAILED,
} from './../../config/messages'

const FeatureSchema = new mongoose.Schema({
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

export function findAll() {
  return Feature.find({})
    .then(payload => payload)
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
