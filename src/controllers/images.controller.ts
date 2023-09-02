import { type Request, type Response } from 'express'
import { Service } from 'typedi'

@Service()
export class ImagesController {
  getImages(req: Request, res: Response) {
    res.send('Sending images!')
  }

  saveImages(req: Request, res: Response) {
    res.send('Saving images!')
  }
}
