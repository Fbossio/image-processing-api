import Router from 'express'
import Container from 'typedi'
import { ImagesController } from '../controllers/images.controller'
const router = Router()
const imagesController = Container.get(ImagesController)

router.get('/dimension', (req, res) => {
  imagesController.getImages(req, res)
})

export default router
