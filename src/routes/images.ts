import Router, { type Request, type Response } from 'express'
import { type NextFunction } from 'express-serve-static-core'
import { query, validationResult } from 'express-validator'
import Container from 'typedi'
import ImagesController from '../controllers/images.controller'
import upload from '../middlewares/image.upload'

const router = Router()
const imagesController = Container.get(ImagesController)
/**
 * @swagger
 * /images:
 *   post:
 *     summary: Uploads and save an image.
 *     description: Allows uploading and saving images into the server.
 *     tags:
 *       - Images
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image to be uploaded.
 *             required:
 *               - image
 *     responses:
 *       200:
 *         description: Image saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: Image URL.
 *       500:
 *         description: Internal server error.
 */
router.post(
  '/',
  upload.single('image'),

  (req: Request, res: Response, next: NextFunction) => {
    imagesController.saveImage(req, res).catch(next)
  },
)

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Retrieve a list of saved images.
 *     description: Returns a list of names of images saved on the server.
 *     tags:
 *       - Images
 *     responses:
 *       200:
 *         description: A list of image names.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Image name.
 *       500:
 *         description: Internal server error.
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  imagesController.getImages(req, res).catch(next)
})

/**
 * @swagger
 * /images/resize:
 *   get:
 *     summary: Retrieve a resized image.
 *     description: Returns a URL of a resized image based on the provided query parameters.
 *     tags:
 *       - Images
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the image to be resized.
 *         example: "encenadaport.jpg"
 *       - in: query
 *         name: width
 *         schema:
 *           type: integer
 *         required: true
 *         description: Desired width of the resized image.
 *         example: 300
 *       - in: query
 *         name: height
 *         schema:
 *           type: integer
 *         required: true
 *         description: Desired height of the resized image.
 *         example: 200
 *     responses:
 *       200:
 *         description: Resized image URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: Image URL.
 *       400:
 *         description: Validation errors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                   param:
 *                     type: string
 *                   location:
 *                     type: string
 *               example:
 *                 - msg: "Width is required and must be a number greater than 0"
 *                   param: "width"
 *                   location: "query"
 */
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
