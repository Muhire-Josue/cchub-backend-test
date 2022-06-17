import { Joi } from 'celebrate';
export const createOneRule = Joi.object().keys({
  type: Joi.string().required().valid('video', 'image'),
  filename: Joi.string().required(),
  extension: Joi.string().valid(
    'mp4',
    'mov',
    'wmv',
    'avi',
    'avchd',
    'mkv',
    'webm',
    'png',
    'jpg',
    'jpeg',
    'apng',
    'avif',
    'gif',
    'svg',
  ).required(),
  score_type_1: Joi.number().integer().min(0).max(100),
  score_type_2: Joi.number().integer().min(0).max(100),
  score_type_3: Joi.number().integer().min(0).max(100),
});

export const updateOneRule = Joi.object().keys({
  id: Joi.number().integer(),
  score_type_1: Joi.number().integer().min(0).max(100),
  score_type_2: Joi.number().integer().min(0).max(100),
  score_type_3: Joi.number().integer().min(0).max(100),
});
export const getOneRule = Joi.object().keys({
  id: Joi.number().integer(),
});