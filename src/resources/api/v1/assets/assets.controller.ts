import { Request, Response } from 'express';
import Sequelize from 'sequelize';
import Assets from '../../../../database/models/Assets';
import jsonResponse from '../../../../helpers/jsonResponse';
import * as statusCodes from '../../../../constants/statusCodes';
import message from '../../../../constants/responseMessages';

/**
 * Assets controllers
 */

export const createOne = async (req: Request, res: Response): Promise<any> => {
  const requestPayload = req.body;
  const { filename, type, extension } = requestPayload;
  const foundAsset = await Assets.findOne({ where: { filename } });
  if (
    (type === 'video' &&
      !['mp4', 'mov', 'wmv', 'avi', 'avchd', 'mkv', 'webm'].includes(extension)) ||
    (type === 'image' && !['png', 'jpg', 'jpeg', 'apng', 'avif', 'gif', 'svg'].includes(extension))
  ) {
    return jsonResponse({
      res,
      status: statusCodes.BAD_REQUEST,
      error: message.invalidExtension,
    });
  }
  if (foundAsset) {
    return jsonResponse({
      res,
      status: statusCodes.CONFLICT,
      error: message.assetExist,
    });
  }
  const assest = await Assets.create(requestPayload);
  return jsonResponse({
    res,
    status: statusCodes.CREATED,
    message: message.assetCreated,
    data: assest,
  });
};

export const updateOne = async (req: Request, res: Response): Promise<any> => {
  const { score_type_1, score_type_2, score_type_3 } = req.body;
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return jsonResponse({
      res,
      status: statusCodes.BAD_REQUEST,
      error: message.invalidID,
    });
  }

  const foundAsset = await Assets.findOne({ where: { id } });
  if (!foundAsset) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: message.notFound,
    });
  }
  if (score_type_1) {
    await Assets.increment('score_type_1', { by: score_type_1, where: { id } });
  }
  if (score_type_2) {
    await Assets.increment('score_type_2', { by: score_type_2, where: { id } });
  }
  if (score_type_3) {
    await Assets.increment('score_type_3', { by: score_type_3, where: { id } });
  }
  return jsonResponse({
    res,
    status: statusCodes.OK,
    message: message.assetUpdated,
  });
};

export const getOne = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  if (isNaN(parseInt(id))) {
    return jsonResponse({
      res,
      status: statusCodes.BAD_REQUEST,
      error: message.invalidID,
    });
  }

  const asset = await Assets.findOne({ where: { id } });
  if (!asset) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: message.notFound,
    });
  }
  return jsonResponse({
    res,
    status: statusCodes.OK,
    data: asset,
  });
};

export const getScoreAverage = async (req: Request, res: Response): Promise<any> => {
  const { type, score_type }: any = req.query;
  let scoreAverage;

  if (!['score_type_1', 'score_type_2', 'score_type_3'].includes(score_type)) {
    return jsonResponse({
      res,
      status: statusCodes.BAD_REQUEST,
      error: message.invalidScoreType,
    });
  }
  if (!['image', 'video'].includes(type)) {
    return jsonResponse({
      res,
      status: statusCodes.BAD_REQUEST,
      error: message.invalidAssetType,
    });
  }
    if (score_type === 'score_type_1') {
      scoreAverage = await Assets.findAll({
        attributes: [[Sequelize.fn('avg', Sequelize.col('score_type_1')), 'score_type_1_avg']],
        where: { type },
      });
    }
  if (score_type === 'score_type_2') {
    scoreAverage = await Assets.findAll({
      attributes: [[Sequelize.fn('avg', Sequelize.col('score_type_2')), 'score_type_2_avg']],
      where: { type },
    });
  }
  if (score_type === 'score_type_3') {
    scoreAverage = await Assets.findAll({
      attributes: [[Sequelize.fn('avg', Sequelize.col('score_type_3')), 'score_type_3_avg']],
      where: { type },
    });
  }
  return jsonResponse({
    res,
    status: statusCodes.OK,
    data: scoreAverage,
  });
};
