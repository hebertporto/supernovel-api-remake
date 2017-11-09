import Joi from 'joi'

export const createFeatureSchema = {
  body: {
    shownSince: Joi.date().required(),
    imagePath: Joi.string(),
    active: Joi.boolean().required(),
    novel: Joi.string().required(),
    file: Joi.binary(),
  },
  options: {
    allowUnknownBody: false,
  },
}

export const registerSchema = {
  body: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().valid(['PUBLISHER', 'USER']).required(),
  },
  options: {
    allowUnknownBody: false,
  },
}

