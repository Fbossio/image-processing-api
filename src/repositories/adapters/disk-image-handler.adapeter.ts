import { type Request } from 'express'
import fs from 'fs'
import path from 'path'
import { Service } from 'typedi'
import { type ImageHandler } from '../ports/image-handler'

@Service()
export class DiskImageHandlerAdapter implements ImageHandler {
  async saveImage(req: Request): Promise<any> {
    if (req.file == null) {
      throw new Error('No file uploaded')
    }

    const fileName = req.file.originalname
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')

    const image = req.file.buffer

    const fullPath = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'full',
      fileName,
    )

    await fs.promises.writeFile(fullPath, image)
    const host = req.get('host')
    const protocol = req.protocol

    return `${protocol}://${host}/full/${fileName}`
  }

  async getImagesList(): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      const directoryPath = path.join(__dirname, '..', '..', 'assets', 'full')

      fs.readdir(directoryPath, (err, files) => {
        if (err != null) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`Error retrieving files: ${err.message}`)
        } else {
          resolve(files)
        }
      })
    })
  }

  async getImage(imgName: string): Promise<string> {
    return 'Image_url'
  }
}
