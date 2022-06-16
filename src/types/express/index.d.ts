import User from 'models/Assets';

declare namespace Express {
  interface Request {
  }
}

interface ResponseError extends Error {
  status?: number;
}
