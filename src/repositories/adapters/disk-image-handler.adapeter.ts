import { type Request } from 'express'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { Service } from 'typedi'
import { type ImageHandler } from '../ports/image-handler'

@Service()
export class DiskImageHandlerAdapter implements ImageHandler {
  private readonly fullImageDir = path.join(
    __dirname,
    '..',
    '..',
    'assets',
    'full',
  )

  private readonly thumbImageDir = path.join(
    __dirname,
    '..',
    '..',
    'assets',
    'thumb',
  )

  async saveImage(req: Request): Promise<string> {
    if (req.file == null) {
      throw new Error('No file uploaded')
    }

    const fileName = req.file.originalname
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')

    const image = req.file.buffer
    const fullPath = path.join(this.fullImageDir, fileName)

    await fs.promises.writeFile(fullPath, image)
    const host = req.get('host')
    const protocol = req.protocol

    return `${protocol}://${host}/full/${fileName}`
  }

  async getImagesList(): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      fs.readdir(this.fullImageDir, (err, files) => {
        if (err != null) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`Error retrieving files: ${err.message}`)
        } else {
          resolve(files)
        }
      })
    })
  }

  async getImage(req: Request): Promise<string> {
    const name = req.query.name as string
    const width = parseInt(req.query.width as string)
    const height = parseInt(req.query.height as string)

    const sourcePath = path.join(this.fullImageDir, name)
    const thumbName = `${width}x${height}_${name}`
    const thumbPath = path.join(this.thumbImageDir, thumbName)
    const host = req.get('host')
    const protocol = req.protocol

    // Check if thumb already exists
    if (fs.existsSync(thumbPath)) {
      return `${protocol}://${host}/thumb/${thumbName}`
    }

    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      throw new Error('Image not found')
    }

    // Create thumb
    await sharp(sourcePath).resize(width, height).toFile(thumbPath)

    return `${protocol}://${host}/thumb/${thumbName}`
  }
}
