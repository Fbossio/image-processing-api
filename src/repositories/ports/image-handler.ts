import { type Request } from 'express'

export interface ImageHandler {
  saveImage: (req: Request) => Promise<string>
  getImagesList: () => Promise<string[]>
  getImage: (imgName: string) => Promise<string>
}
