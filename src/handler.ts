import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  request?: any;
  response?: any;
  name: string;
  message: string;
}

const logError = ({ name, message, request, response }: CustomError): void => {
  const timeString = new Date().toString().split(' ').slice(1, 5).join(' ');
  console.error(`\n${timeString} : ${name} \n`, message);

  if (request) {
    console.error('   Request :', request, '\n', '    Response :', response);
  }
};

const apiErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name, message } = err;
  logError(err);

  let status: number = 0;
  let displayMsg: string = '';

  switch (name) {
    case 'request entity too large':
      status = 400;
      displayMsg = 'Server Overworked';
      break;
    case 'BSONTypeError':
    case 'Error':
    case 'ValidationError':
      status = 400;
      displayMsg = message;
      break;
    case 'AuthError':
    case 'ApiKeyError':
    case 'AccessError':
    case 'JsonWebTokenError':
      status = 401;
      displayMsg = message;
      break;
    case 'TokenExpiredError':
      status = 403;
      displayMsg = 'Session Expired';
      break;
    case 'MongoServerError':
      status = 500;
      displayMsg = 'Mongo Server Error';
      break;
    case 'ReferenceError':
      status = 500;
      displayMsg = 'Programming Error';
      break;
    default:
      status = 500;
      displayMsg = 'Server Overworked';
  }

  if (!(req as any).isEncrypted) {
    res.status(status).json({ message: displayMsg });
  } else {
    res.status(200).json({
      message: 'Success',
    });
  }
};

export { apiErrorHandler };
