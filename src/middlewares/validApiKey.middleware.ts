import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/httpException';
import { API_KEY } from '@/config';

const getAuthorization = req => {
  const apiKey = req.header('X-API-Key');
  if (apiKey) return apiKey;

  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

/**
 * ValidationMiddleware
 */
export const ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {

  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const Authorization = getAuthorization(req);
      if (Authorization === API_KEY) {
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }

  } catch (error) {
    next(new HttpException(500, 'Error in Validation'));
  }
};
