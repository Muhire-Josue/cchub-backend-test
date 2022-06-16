import { Request, Response } from 'express';
import Assets from '../../../../database/models/Assets';
import jsonResponse from '../../../../helpers/jsonResponse';
import * as statusCodes from '../../../../constants/statusCodes';
import message from '../../../../constants/responseMessages';

/**
 * Assets controllers 
 */

export const createOne = async (req: Request, res: Response): Promise<any> => {
  const requestPayload = req.body;
  const { filename } = requestPayload;
  const foundAsset = await Assets.findOne({ where: { filename } });
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
