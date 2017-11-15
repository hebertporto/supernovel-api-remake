import Joi from 'joi'

export const createChapterSchema = {
  body: {
    number: Joi.string().required(),
    title: Joi.string().required(),
    translators: Joi.string().required(),
    revisors: Joi.string().required(),
    content: Joi.string().required(),
    novel: Joi.string().required(),
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

