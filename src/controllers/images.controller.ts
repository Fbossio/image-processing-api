import { type Request, type Response } from 'express'
import { Service } from 'typedi'
import ImagesService from '../services/images.service'

@Service()
export default class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  async getImages(req: Request, res: Response) {
    const result = await this.imagesService.getImages()
    res.send(result)
  }

  async saveImages(req: Request, res: Response) {
    const result = await this.imagesService.saveImages()
    res.send(result)
  }
}
