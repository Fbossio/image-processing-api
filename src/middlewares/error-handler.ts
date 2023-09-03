import { type NextFunction, type Request, type Response } from 'express'

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
}

export default errorHandler
