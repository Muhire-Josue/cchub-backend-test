import { Response } from 'express';
import { OK } from 'constants/statusCodes';
interface ResponseParams {
  res: Response;
  status?: number;
  data?: any;
  token?: string;
  message?: string;
  errorCode?: string;
  errors?: any;
  accessCode?: number;
  [key: string]: any;
}
/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {ServerResponse} Response
 */
const jsonResponse = ({ status = OK, res, ...data }: ResponseParams): Response => {
  return res.status(status).json({
    status,
    ...data,
  });
};

export default jsonResponse;
