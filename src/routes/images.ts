import Router from 'express'
import Container from 'typedi'
import ImagesController from '../controllers/images.controller'
import upload from '../middlewares/image.upload'

const router = Router()
const imagesController = Container.get(ImagesController)

router.post('/', upload.single('image'), (req, res, next) => {
  imagesController.saveImage(req, res).catch(next)
})

router.get('/', (req, res, next) => {
  imagesController.getImages(req, res).catch(next)
})

router.get('/dimension', (req, res, next) => {
  imagesController.getImage(req, res).catch(next)
})

export default router
