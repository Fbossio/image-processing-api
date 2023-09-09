import Router, { type Request, type Response } from 'express'
import { type NextFunction } from 'express-serve-static-core'
import { query, validationResult } from 'express-validator'
import Container from 'typedi'
import ImagesController from '../controllers/images.controller'
import upload from '../middlewares/image.upload'

const router = Router()
const imagesController = Container.get(ImagesController)

router.post(
  '/',
  upload.single('image'),

  (req: Request, res: Response, next: NextFunction) => {
    imagesController.saveImage(req, res).catch(next)
  },
)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  imagesController.getImages(req, res).catch(next)
})

router.get(
  '/resize',
  [
    query('name').isString().notEmpty(),
    query('width')
      .isInt({ min: 1 })
      .notEmpty()
      .withMessage('Width is required and must be a number greater than 0'),
    query('height')
      .isInt({ min: 1 })
      .notEmpty()
      .withMessage('Height is required and must be a number greater than 0'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    imagesController.getImage(req, res).catch(next)
  },
)

export default router
