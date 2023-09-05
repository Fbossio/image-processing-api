import { type Request } from 'express'
import { Inject, Service } from 'typedi'
import { ImageHandler } from '../repositories/ports/image-handler'

@Service()
export default class ImagesService {
  constructor(
    @Inject('ImageHandler') private readonly imageHandler: ImageHandler,
  ) {}

  public async saveImage(req: Request) {
    return await this.imageHandler.saveImage(req)
  }

  public async getImages() {
    return await this.imageHandler.getImagesList()
  }

  public async getImage(imgName: string) {
    return await this.imageHandler.getImage(imgName)
  }
}
