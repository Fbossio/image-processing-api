import { type Request, type Response } from 'express'
import { Service } from 'typedi'
import ImagesService from '../services/images.service'

@Service()
export default class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  async saveImage(req: Request, res: Response) {
    const result = await this.imagesService.saveImage(req)
    res.send(result)
  }

  async getImages(req: Request, res: Response) {
    const result = await this.imagesService.getImages()
    res.send(result)
  }

  async getImage(req: Request, res: Response) {
    const result = await this.imagesService.getImage(req)
    res.send(result)
  }
}
