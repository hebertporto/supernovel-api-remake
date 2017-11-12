import Joi from 'joi'

export const createNovelSchema = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    translation_team: Joi.string().required(),
    cover_url: Joi.string(),
    user: Joi.string(),
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

